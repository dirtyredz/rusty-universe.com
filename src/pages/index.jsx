import React, { Component } from 'react';
import CenterLinks from '../components/CenterLinks'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    align-items: center;
    align-content: center;
`;
const Home = ({ transition, props }) =>(
    <Wrapper style={transition && transition.style}>
        <CenterLinks/>
    </Wrapper>
)

export default Home