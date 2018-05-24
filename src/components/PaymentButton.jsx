import React from "react";
import Link from 'gatsby-link';
import styled, { keyframes } from 'styled-components';
import PaypalForm from './PaypalForm'
import ReactDOM from 'react-dom';
import ButtonHover from './resources/ButtonHover.mp3'

const FX = keyframes`
  0% {
    opacity: 1
  }
  30% {
    opacity: 0
  }
  50% {
    opacity: 0
  }
  70% {
    opacity: 0
  }
  to {
    opacity: 1
  }
`

const Button = styled.div`
    background-color: #9bafe6;
    border: none;
    color: black;
    font-family: 'borg';
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 36px;
    cursor: pointer;
    transition: box-shadow 0.3s linear;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-bottom: 10px;
    &:hover div span.FX{
        animation: ${FX} .3s linear alternate;
    }
`;

export default class PaymentButton extends React.Component{
    constructor(props){
        super(props)
        this.state={PopUp: false,Message: false}
    }
    TogglePaypal(e){
        this.setState({PopUp: !this.state.PopUp})
        console.log('Toggling')
    }
    GlitchText(){
        let Button = ReactDOM.findDOMNode(this.button)
        let num_characters = Button.children.length;
        let random_char_num = Math.floor(Math.random() * num_characters);
        Button.children[random_char_num].className += 'FX '
    }
    onEnter(){
        let Button = ReactDOM.findDOMNode(this.button)
        let Audio = ReactDOM.findDOMNode(this.audio)
        Audio.play()
        for (let i=0; i < Button.children.length; i++) {
            setTimeout(this.GlitchText.bind(this), 125 * i);
        }
    }
    onLeave(){
        let v = ReactDOM.findDOMNode(this.audio)
        let Button = ReactDOM.findDOMNode(this.button)
        Button
        let arr = Array.prototype.slice.call( Button.children )
        arr.map((child)=>{
            child.classList.remove("FX");
        })
    }
    render(){
        return (
            <ButtonContainer
                onMouseEnter={this.onEnter.bind(this)}
                onMouseLeave={this.onLeave.bind(this)}>
                {this.state.PopUp ? <PaypalForm {...this.props} TogglePaypal={this.TogglePaypal.bind(this)}/>:''}
                <Button
                    ref={(node)=>this.button = node}
                    onClick={this.TogglePaypal.bind(this)}
                    {...this.props}>
                    {this.props.children.map((child)=>{
                        if (typeof(child) === 'string'){
                            let charecter = child.split('')
                            return charecter.map((char)=><span>{char}</span>)
                        }else{
                            return child
                        }
                    })}
                </Button>
                <audio ref={(node)=>this.audio = node}>
                    <source src={ButtonHover}/>
                </audio>
            </ButtonContainer>
        );
    }
}
