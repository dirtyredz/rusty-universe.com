import React from 'react';
import styled from 'styled-components'
import paypal from 'paypal-checkout'
import ReactDOM from 'react-dom';


class PaypalForm extends React.Component{
    constructor(props){
        super(props);
    }

    payment(data, actions){
        // Make a call to the REST api to create the payment
        const Amount = this.props.data.rank.edges.reduce((a,b)=>{
            if (b.node.frontmatter.title === this.props.rank)
                return b.node.frontmatter.amount
            return a
        })
        return new paypal.Promise(function(resolve, reject) {

            // Call your server side to get the Payment ID from step 3, then pass it to the resolve callback
            fetch('http://api.dirtyredz.com/paypalsubscription',{
                method: 'post',
                body: JSON.stringify({test:"test"})
            }).then(function(response) {
              return response.json()
            }).then(function(responseObject) {
        		console.log(responseObject);
        	}).catch(function(err) {
        		console.log("Fetch error: " + err);
        	});
        });
    };

    onAuthorize(data, actions){
        return actions.payment.execute().then(function() {
            window.alert('Payment Complete!');
        });
    };
    render(){
        const Options = this.props.data.rank.edges.map((a)=>{
            if (a.node.frontmatter.title === this.props.rank)
                return <option selected value={a.node.frontmatter.title}>{a.node.frontmatter.title} : €{a.node.frontmatter.amount},00 EUR – monthly</option>
            return <option value={a.node.frontmatter.title}>{a.node.frontmatter.title} : €{a.node.frontmatter.amount},00 EUR – monthly</option>
        })
        let client = {
            sandbox:    'AcWJhM_GK9zqjwpnWKtRSXbHV1eRdFyNmlq-4FAQMZDLmZYPyI9d-ViWRst236DrbWlaSaS7wWeMP5RM',
            production: '<insert production client id>'
        };

        let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
        return(
            <div className='shoppingCart'>
                <p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

                <PayPalButton
                    client={client}
                    payment={this.payment.bind(this)}
                    env='sandbox'
                    commit={true}
                    onAuthorize={this.onAuthorize}
                    style={{
                        label: 'paypal',
                        size:  'medium',    // small | medium | large | responsive
                        shape: 'rect',     // pill | rect
                        color: 'blue',     // gold | blue | silver | black
                        tagline: false}}/>
            </div>
        )
    }
}

export default PaypalForm