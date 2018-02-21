import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components'
import parse from 'xml-parser'
import ServerCardBG_1 from './resources/ServerCardBG_1.png'
import ServerCardBG_2 from './resources/ServerCardBG_2.png'
import ServerCardBG_3 from './resources/ServerCardBG_3.png'
import ServerCardBG_4 from './resources/ServerCardBG_4.png'
import ServerCardBG_5 from './resources/ServerCardBG_5.png'
import ServerCardBG_6 from './resources/ServerCardBG_6.png'
import ServerCardBG_7 from './resources/ServerCardBG_7.png'
import verdanab from './resources/verdanab.ttf'
import USLogo from './resources/united-states.png'
import EULogo from './resources/european-union.png'

injectGlobal`
  @font-face {
    font-family: 'verdanab';
    src: url('${verdanab}');
  }
`;

const ServerBox = styled.div`
    font-family: 'verdanab';
    color: white;
    font-weight: bold;
    font-size: 20px;
    width: 250px;
    height: 250px;
    min-width: 250px;
    max-width: 250px;
    background: grey;
    border-radius: 10px;
    margin: 5px;
    padding-top: 15px;
    background-image: url(${props => props.BG ? props.BG : ServerCardBG_1});
    flex: 1;
    border: 3px solid ${props => props.color ? props.color : "#000"};
    box-shadow: 0 0 8px ${props => props.color ? props.color : "#000"};
`
const ServerName = styled.div`
    width: 100%;
    font-size: 30px;
    text-align: center;
    color: white;
    text-shadow: 0 0 6px ${props => props.color ? props.color : "#000"};
`
const Section = styled.div`
    background-color: rgba(0,0,0,0.8);
    border-top: 1px solid ${props => props.color ? props.color : "#000"};
    border-bottom: 2px solid ${props => props.color ? props.color : "#000"};
    width: calc(100% - 5px);
    margin-bottom: 10px;
    text-align: center;
    color: grey;
    font-size: 13px;
    padding-top: 4px;
    padding-left: 5px;
    padding-bottom: 4px;
`

class ServerCard extends React.Component {
    constructor(props){
        super(props)
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        this.ServerCardBG_1 = ServerCardBG_1
        this.ServerCardBG_2 = ServerCardBG_2
        this.ServerCardBG_3 = ServerCardBG_3
        this.ServerCardBG_4 = ServerCardBG_4
        this.ServerCardBG_5 = ServerCardBG_6
        this.ServerCardBG_6 = ServerCardBG_5
        this.ServerCardBG_7 = ServerCardBG_7
        this.state={
            Status: "-----",
            Name: "-----",
            Players: "--",
            Load: "-----",
            BG: this["ServerCardBG_"+randomNumber]
        }
        console.log(this.state.BG)
    }
    getServerRSS(url){

        return new Promise( (resolve, reject) => {
          fetch(url + "/rss")
          .then((res)=>res.body)
          .then((body)=>{
              const reader = body.getReader();
                return new ReadableStream({
                  start(controller) {
                    return pump();

                    function pump() {
                      return reader.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                          controller.close();
                          return;
                        }

                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                      });
                    }
                  }
              })
          })
          .then(stream=>new Response(stream))
          .then(resp=>resp.text())
          .then(text=>resolve(text))
          .catch((err)=>reject(err))
        });
    }
    ParseRSSData(){
        this.getServerRSS(this.props.interface)
        .then((result)=>{
            let obj = parse(result).root.children[0].children

            let Status = obj.filter(child=>child.name === "status")[0].content
            let Name = obj.filter(child=>child.name === "title")[0].content
            let Players = obj.filter(child=>child.name === "playercount")[0].children[0].content
            let Load = obj.filter(child=>child.name === "load")[0].content
            this.setState({
                Status: Status,
                Name: Name,
                Players: Players > 0 ? Players : 0,
                Load: Load
            })
        })
    }
    componentDidMount(){
        setTimeout(()=>{
            this.ParseRSSData()
        },1000)

        this.interval = setInterval(() => {
            this.ParseRSSData()
        }, 1000 * 60 * 5)
    }
    componentWillUnmount(){
       clearInterval(this.interval);
    }
    render(){
        return(
            <ServerBox color={this.props.color} BG={this.state.BG}>
                <Section color={this.props.color}>
                    <ServerName color={this.props.color}><img width="23" src={this.props.country === "US" ? USLogo : EULogo }></img>{this.props.pvp ? "PVP" : "PVE"}</ServerName>
                </Section>
                <Section color={this.props.color}>
                    <div>Name: <span>{this.state.Name}</span></div>
                    <div>Status: <span>{this.state.Status}</span></div>
                    <div>Players: <span>{this.state.Players}</span></div>
                    <div>Load: <span>{this.state.Load}</span></div>
                    <div>IP: <span>{this.props.ip}</span></div>
                    <div><span>{this.props.description}</span></div>
                </Section>
                <br/>
                <Section color={this.props.color}>
                    <div><span><a>{this.props.interface}</a></span></div>
                </Section>
            </ServerBox>
        )
    }
}

export default ServerCard