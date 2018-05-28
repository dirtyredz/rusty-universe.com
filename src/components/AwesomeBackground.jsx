import React from "react";
import MouseParallax from './MouseParallax'
import styled from 'styled-components'
import { TweenLite, Linear, CSSPlugin } from 'gsap'
import ReactDOM from 'react-dom';
import dots from './resources/dots.png'
import dots2 from './resources/dots2.png'
import galaxy from './resources/galaxy.jpg'
import BackgroundMusic from './resources/Background_Rusty.mp3'
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    volume: state.volume
  };
}

class AwesomeBackground extends React.Component {
    componentDidMount(){
        let MiddleLayer, MiddleCTX, BackLayer, BackCTX, FrontLayer, FrontCTX;

        BackLayer = ReactDOM.findDOMNode(this.BackLayer)
        MiddleLayer = ReactDOM.findDOMNode(this.MiddleLayer)
        FrontLayer = ReactDOM.findDOMNode(this.FrontLayer)

        let drawLine = (x1,y1,x2,y2,ratio,speed)=>{
            ratio = ratio || 0;

            MiddleCTX.beginPath();
            MiddleCTX.moveTo(x1, y1);
            let ex = x1 + ratio * (x2-x1);
            let ey = y1 + ratio * (y2-y1);
            MiddleCTX.lineTo(ex, ey);
            MiddleCTX.lineWidth = 1;
            MiddleCTX.strokeStyle = 'rgba(255,255,255, 1)';
            MiddleCTX.stroke();

            if(ratio<1) {
              requestAnimationFrame(() => {
                drawLine(x1,y1,x2,y2,ratio + speed,speed);
              });
            }
        }

        var startOver = function () {
            BackCTX.clearRect (0, 0, BackLayer.width, BackLayer.height);
            MiddleCTX.clearRect (0, 0, MiddleLayer.width, MiddleLayer.height);
            FrontCTX.clearRect (0, 0, FrontLayer.width, FrontLayer.height);
        };

        let getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

        let start = () => {
            //Settup canvas
            BackLayer.width  = 4000;
            BackLayer.height = 2000;
            BackCTX = BackLayer.getContext('2d');

            MiddleLayer.width  = BackLayer.width;
            MiddleLayer.height = BackLayer.height;
            MiddleCTX = MiddleLayer.getContext('2d');

            FrontLayer.width  = BackLayer.width;
            FrontLayer.height = BackLayer.height;
            FrontCTX = FrontLayer.getContext('2d');

            //Draw the lines
            let NumberLines = 15
            for (let i = 0; i < NumberLines; i++) {
                let x = MiddleLayer.width / NumberLines * i
                let y = MiddleLayer.height / NumberLines * i
                setTimeout(()=>{
                    drawLine(x,-100,x,MiddleLayer.height/2,0,getRandomArbitrary(0.004, 0.008));
                    drawLine(x,MiddleLayer.height+100,x,MiddleLayer.height/2,0,getRandomArbitrary(0.004, 0.008));
                    drawLine(-100,y,MiddleLayer.width/2,y,0,getRandomArbitrary(0.004, 0.008));
                    drawLine(MiddleLayer.width+100,y,MiddleLayer.width/2,y,0,getRandomArbitrary(0.004, 0.008));
                },getRandomArbitrary(300, 100))
            }

        };

        const TheBG = ReactDOM.findDOMNode(this.GalaxyBG)
        const breath = (scale) => {
            if (scale === 1){
                scale = 1.2
            }else{
                scale = 1
            }
            TweenLite.to(TheBG, 80, {roation: 0.01,scale: scale,onComplete:breath, onCompleteParams:[scale],ease:Linear.ease});
        }
        setTimeout(start, 500);
        setTimeout(()=>{
            TweenLite.to(TheBG, 2, {roation: 0.01,opacity: 0.7});
            TweenLite.to(TheBG, 10, {roation: 0.01,scale: 1.2,onComplete:breath,ease:Linear.ease});
            TweenLite.to(BackLayer, 5, {roation: 0.01,opacity: 0.8,delay:2});
            TweenLite.to(FrontLayer, 10, {roation: 0.01,opacity: 0.5,delay:5});
        },1);
        //window.addEventListener("resize", startOver);
    }
    handleVolume(Node){
      this.Audio = Node
      if(!this.props.volume.Muted){
        const Audio = ReactDOM.findDOMNode(this.Audio)
        if(Audio)
          Audio.volume = 0.1;
      }
    }
    render() {
        return(
            <Wrapper>
                {this.props.volume.Muted ? null : <audio ref={this.handleVolume.bind(this)} autoPlay loop>
                    <source src={BackgroundMusic}/>
                </audio>}
                <Galaxy ref={(a)=>{this.GalaxyBG = a}}/>
                <MouseParallax>
                    <StackedCanvas ref={(a)=>{this.BackLayer = a}} id="BackLayer"></StackedCanvas>
                    <StackedCanvas ref={(a)=>{this.MiddleLayer = a}} style={{opacity: 0.04}} id="MiddleLayer"></StackedCanvas>
                    <StackedCanvas ref={(a)=>{this.FrontLayer = a}} id="FrontLayer"></StackedCanvas>
                </MouseParallax>
            </Wrapper>
        )
    }
}

export default connect(mapStateToProps)(AwesomeBackground)

const StackedCanvas = styled.canvas`
    position: absolute;
`;
const Wrapper = styled.div`
    overflow: hidden;
    height: 100%;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    & #BackLayer{
        background: url("${dots2}");
        background-repeat: repeat;
        opacity: 0;
    }
    & #FrontLayer{
        background: url("${dots}");
        background-repeat: repeat;
        background-position-y: 5%;
        opacity: 0;
    }
`;
const Galaxy = styled.div`
    overflow: hidden;
    height: 100%;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    content: "";
    background: url("${galaxy}");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
`;