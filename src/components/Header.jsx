import React from "react";
import styled, { injectGlobal } from 'styled-components'
import RustyLogo from './RustyLogo'
import TallLean from './resources/Tall & Lean.ttf'

injectGlobal`
  @font-face {
    font-family: 'TallLean';
    src: url('${TallLean}');
  }
`;

const StyledHeader = styled.header`
    width: 100%;
    height: 100px;
    max-height: 100px;
    flex: 1;
    opacity: 0;
    transition: opacity 1s;
`;
const Title = styled.div`
    font-family: "TallLean";
    font-size: calc(50px + 20 * ((100vw - 320px) / 1360));
    color: white;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    height: 100%;
    white-space: nowrap;
`;
const Loaded = {
    opacity: 1
}

export default class Header extends React.Component {
    constructor(){
        super();
        this.state = {Loaded: false};
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({Loaded: true});
        },500);
    }
    render(){
        return(
            <StyledHeader style={(this.state.Loaded) ? Loaded : {}}>
                <RustyLogo/>
                <Title>RUSTY-UNIVERSE</Title>
            </StyledHeader>
        )
    }
}
