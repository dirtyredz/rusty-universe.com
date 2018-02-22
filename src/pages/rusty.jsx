import React, { Component } from 'react';
import styled from 'styled-components'
import RustyAnnouncments from '../components/RustyAnnouncments'

const Wrapper = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    align-items: center;
    align-content: center;
`;

const Rusty = ({ transition, props }) =>(
    <Wrapper style={transition && transition.style}>
        <RustyAnnouncments/>
    </Wrapper>
)

export default Rusty