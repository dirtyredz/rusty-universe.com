import React from "react";
import styled from 'styled-components'
import detectPassiveEvents from 'detect-passive-events';
import { TweenLite, Linear } from 'gsap'

const StyledDiv = styled.div`
    position: absolute;
    left: -100px;
    top: -100px;
    & *{
        transition: transform 1s ease-out;
    }
    & *:nth-child(1){
    }
    & *:nth-child(3){
    }
`;

export default class MouseParallax extends React.Component {
    componentDidMount(){
        let TheDiv = document.getElementById("MouseParallax");

        let Scroll = (e) => {
                let ParallaxStrength = 60

                TweenLite.to(TheDiv.childNodes[0], 0.5, {roation: 0.01, top:-((window.scrollY/ParallaxStrength)*2), ease: Linear.ease});

                ParallaxStrength = ParallaxStrength - 50
                TweenLite.to(TheDiv.childNodes[1], 0.5, {roation: 0.01, top:window.scrollY/ParallaxStrength, ease: Linear.ease});

                ParallaxStrength = ParallaxStrength + 50
                TweenLite.to(TheDiv.childNodes[2], 0.5, {roation: 0.01, top:window.scrollY/ParallaxStrength, ease: Linear.ease});
        }
        let Mouse = (e) => {
                let ParallaxStrength = 80

                let posX = window.innerWidth/2;
                let posY;
                if ((e.clientX)&&(e.clientY)) {
                    posX = e.clientX;
                    posY = e.clientY;
                } else if (e.targetTouches) {
                    posX = e.targetTouches[0].clientX;
                    posY = e.targetTouches[0].clientY;
                }

                let newX = (posX - window.innerWidth / 2)
                let newY = (posY)
                TweenLite.to(TheDiv.childNodes[0], 0.5, {roation: 0.01,left:-((newX/ParallaxStrength)*2), top:-((newY/ParallaxStrength)*2), ease: Linear.ease});

                ParallaxStrength = ParallaxStrength - 50
                TweenLite.to(TheDiv.childNodes[1], 0.5, {roation: 0.01,left:newX/ParallaxStrength, top:newY/ParallaxStrength, ease: Linear.ease});

                ParallaxStrength = ParallaxStrength + 50
                TweenLite.to(TheDiv.childNodes[2], 0.5, {roation: 0.01,left:newX/ParallaxStrength, top:newY/ParallaxStrength, ease: Linear.ease});
        }

        document.addEventListener('mousemove', Mouse, detectPassiveEvents.hasSupport ? { passive : true } : false);
        window.addEventListener('scroll', Scroll, detectPassiveEvents.hasSupport ? { passive : true } : false);
        document.addEventListener('touchstart', Mouse, detectPassiveEvents.hasSupport ? { passive : true } : false);
        document.addEventListener("touchmove", Mouse, detectPassiveEvents.hasSupport ? { passive : true } : false);

        setTimeout(()=>{
            requestAnimationFrame(() => {
                Mouse({clientX: window.innerWidth/2, clientY: window.innerHeight/2})
            });
        },60)
    }
    render() {
        return(
            <StyledDiv id="MouseParallax">
                {this.props.children}
            </StyledDiv>
        )
    }
}
