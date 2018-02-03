import React from "react";
import styled, { injectGlobal } from 'styled-components'
import TallLean from './resources/Tall & Lean.ttf'

injectGlobal`
  @font-face {
    font-family: 'TallLean';
    src: url('${TallLean}');
  }
`;

const Footer = styled.div`
    width: 100%;
    left: 0;
    bottom: 0;
    height: 75px;
    margin-top: -75px;
    color: white;
    font-size: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: right;
`;
const Item = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: right;
    padding-right: 50px;
`;
export default () => {
    return(
        <Footer>
            <Item>
                DEVELOPED BY DAVID MCCLAIN | DIRTYREDZ.COM
            </Item>
        </Footer>
    )
}
