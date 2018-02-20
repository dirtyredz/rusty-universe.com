import React, { Component } from 'react';
import CenterLinks from '../components/CenterLinks'
import DiscordTab from '../components/DiscordTab'
import styled from 'styled-components'

const Wrapper = styled.div`
min-height: calc(100vh - 200px);
position: relative;
padding-bottom: 100px;
`;
const Home = ({ transition, props }) =>(
    <Wrapper style={transition && transition.style}>
        <CenterLinks/>
        <DiscordTab/>
    </Wrapper>
)

export default Home