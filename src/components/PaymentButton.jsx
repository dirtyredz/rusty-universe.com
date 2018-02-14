import React from "react";
import Link from 'gatsby-link';
import styled from 'styled-components';
import PaypalForm from './PaypalForm'

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

`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-bottom: 10px;
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
    render(){
        return (
            <ButtonContainer >
                {this.state.PopUp ? <PaypalForm {...this.props} TogglePaypal={this.TogglePaypal.bind(this)}/>:''}
                <Button onClick={this.TogglePaypal.bind(this)} {...this.props}>
                    {this.props.children}
                </Button>
            </ButtonContainer>
        );
    }
}
