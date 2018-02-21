import React, { Component } from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    align-items: center;
    align-content: center;
`;
const WidgetBot = styled.embed`
    width: 80%;
    height: 600px;
    padding-left: 10%;
    padding-right: 10%;
    &:#document html body{
        background: pink;
    }
`
const Rusty = ({ transition, props }) =>(
    <Wrapper style={transition && transition.style}>
        <WidgetBot src="https://widgetbot.io/embed/268923609387368448/268923706062012419/1002/" />
    </Wrapper>
)

export default Rusty