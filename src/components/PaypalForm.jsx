import React from 'react';
import styled, { injectGlobal } from 'styled-components'
import paypal from 'paypal-checkout'
import ReactDOM from 'react-dom';
import RewardIcons from './RewardIcons'
import Elixia from '../components/resources/ELIXIA.ttf'

injectGlobal`
  @font-face {
    font-family: 'ELIXIA';
    src: url('${Elixia}');
  }
`;
const Wrapper = styled.div`
    overflow: hidden;
    height: 100%;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(0,0,0,0.95);
    transition: opacity 1s linear;

    & > div{
        position: absolute;
        top: calc(50% - 100px);
        left: 50%;
        width: 70%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        text-align: center;
        flex-direction: column;
        display: flex;
        & > div{
            text-align: center;
            display: flex;
            justify-content: center;
            font-family: 'ELIXIA';
            font-size: 1.2em;
            font-weight: bold;
            color: #9bafe6;

            flex: 1;
            height: 40px;
            padding: 20px;
        }
        & input{
            flex: 1;
            text-align: center;
        }
    }
`
const CloseMe = styled.aside`
    position: absolute;
    right: 0;
    top: 0;
    content: 'X';
    height: 100px;
    width: 100px;
    cursor: pointer;
`
class PaypalForm extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
        if (props.subscribe){
            this.state={Message: props.rank.amount + ' Subcription'}
        }else{
            this.state={Message: props.rank.amount + ' One Time Donation'}
        }
        this.ClientID = "AaPLwkvLQKssgPC7QvZ1UiKFHfqigDlNEye34LMAx18bJBnHECN-_kuU2VgIJSsVEKxrzmr7a3fPi_pG"
    }
    componentDidMount(){
        this.keyup = document.addEventListener("keyup", (event)=>{
            if(event.keyCode == 27 && this.Wrapper)
                this.ShowMessage(null,true,100)
        }, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keyup",this.keyup)
    }
    payment(data, actions){
        // Make a call to the REST api to create the payment
        //https://developer.paypal.com/developer
        return new paypal.Promise((resolve, reject) => {

            // Call your server side to get the Payment ID from step 3, then pass it to the resolve callback
            let PaypalApiUrl = 'https://api.dirtyredz.com/paypal/payment/CreatePayment'
            if (this.props.subscribe)
                PaypalApiUrl = 'https://api.dirtyredz.com/paypal/billing/CreatePlan'

            fetch(PaypalApiUrl,{
                method: 'POST',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                body: JSON.stringify({
                    Description: "InGameName: " + this.InGameName.value + ", DiscordName: " + this.DiscordName.value,
                    Amount: this.props.rank.amount,
                    Rank: this.props.rank.title,
                    ClientID: this.ClientID
                })
            })
            .then((response) => {return response.json()})
            .then((responseObject) => {
                if (this.props.subscribe){
                    resolve(responseObject.Token);
                }else{
                    resolve(responseObject.paymentID);
                }})
            .catch((err) => {
                reject(err)
        		console.log("Fetch error: " + err);
            });
        })
    };

    onAuthorize(data, actions){
        console.log("onAuth",data, actions,data.paymentID,data.payerID)

        let PaypalApiUrl = 'https://api.dirtyredz.com/paypal/payment/ExecutePayment'
        let body = {
            PaymentID: data.paymentID,
            PayerID: data.payerID,
            ClientID: this.ClientID
        }
        if (this.props.subscribe){
            PaypalApiUrl = 'https://api.dirtyredz.com/paypal/billing/ExecuteAgreement'
            body = {
                Token: data.paymentToken,
                ClientID: this.ClientID
            }
        }

        fetch(PaypalApiUrl,{
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: JSON.stringify(body)
        })
        .then((response)=>{return response.json()})
        .then((value)=>{this.ShowMessage(null,'Your Donation was succesfull, Thank You!')})
    };

    onCancel(data) {
        this.ShowMessage(null,'The payment was cancelled!')
    }

    ShowMessage(e,Message,Delay){
        Delay = Delay || 2000
        if (Message && this.Wrapper){
            this.setState({Message: Message})
            setTimeout(()=>{
                let v = ReactDOM.findDOMNode(this.Wrapper)
                if(v)
                    v.style.opacity = 0;

                setTimeout(()=>{
                    this.props.TogglePaypal()
                },1000)
            },Delay)
        }else{
            this.props.TogglePaypal()
        }
    }
    render(){
        let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
        return(
            <Wrapper ref={a=>this.Wrapper = a}>
                <CloseMe onClick={this.ShowMessage.bind(this,null,true,100)}><RewardIcons name="Coins"/></CloseMe>
                <div>
                    <div>{this.state.Message}</div>
                    <div><input ref={(a)=> this.InGameName = a} name="InGameName" placeholder="In Game Name"/></div>
                    <div><input ref={(a)=> this.DiscordName = a} name="DiscordName" placeholder="Discord Name"/></div>
                    <PayPalButton
                        payment={this.payment.bind(this)}
                        onAuthorize={this.onAuthorize.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        env='live'
                        style={{
                            label: 'paypal',
                            size:  'medium',    // small | medium | large | responsive
                            shape: 'rect',     // pill | rect
                            color: 'blue',     // gold | blue | silver | black
                            tagline: false}}/>
                </div>
            </Wrapper>
        )
    }
}

export default PaypalForm