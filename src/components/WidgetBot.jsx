import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal} from 'styled-components'
import Script from 'react-load-script'

injectGlobal`
  .crate{
      display: none;
  }
`;

const WidgetEmbed = styled.embed`
    width: 80%;
    height: 600px;
    padding-left: 10%;
    padding-right: 10%;
`
class WidgetBot extends React.Component {
    handleScriptLoad() {
      let C = new Crate({
          "server":"268923609387368448",
          "channel":"268923609387368448"})
          let Wait = ()=>{
              let WidgetButton = document.getElementsByClassName('crate-toggle')
              if (WidgetButton.length > 0){
                  WidgetButton[0].setAttribute('style',"bottom: 50px !important" )
                  let Crate = document.getElementsByClassName('crate')
                  Array.prototype.slice.call( Crate ).map((node)=>node.style.display= "block")
                  return
              }
              setTimeout(Wait,100);
          }
          Wait()
    }
    render() {
        return(
            <div>
                <Script
                    url="https://crate.widgetbot.io/v2"
                    defer async
                    onLoad={this.handleScriptLoad.bind(this)}
                />
            </div>
        )
    }
}

export default WidgetBot