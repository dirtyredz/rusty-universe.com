import React from "react";
import styled, { injectGlobal } from 'styled-components'
import TallLean from './resources/Tall & Lean.ttf'

injectGlobal`
  @font-face {
    font-family: 'TallLean';
    src: url('${TallLean}');
  }
`;
const ATag = styled.a`
    font-family: 'TallLean'
    color: #4D9BE9;
    font-size: 1.1em;
    text-decoration: none;
    transition: color 0.5s linear;

    &:visited{
        color: #4D9BE9;
    }
    &:hover{
        color: #a0bbd7;
    }
`
const StyledA = (props) =>
    <ATag {...props}>{props.text}</ATag>

export default StyledA