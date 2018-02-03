import React, { Component } from 'react';
import Footer from '../components/Footer'
import styled, { injectGlobal } from 'styled-components';
import { Link } from 'react-router-dom';
import TallLean from '../components/resources/Tall & Lean.ttf'


injectGlobal`
  @font-face {
    font-family: 'TallLean';
    src: url('${TallLean}');
  }
`;
const NotFoundWrapper = styled.div`
    display: table;
    height: calc(100% - 100px);
    width: 100%;

`;
const NotFoundContent = styled.div`
    display: table-cell;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    font-size: 2.5em;
    color: white;

    & a{
        color: #4D9BE9;
        cursor: pointer;
        padding: 10px;
        text-shadow: none;
        transition: all 0.3s;
        text-decoration: none;
        font-family: "TallLean";
        font-size: 3em;


        &:visited {
          color: #4D9BE9;
        }
        &:link {
          color: #4D9BE9;
        }
        &:hover {
          color: white;
        }
    }
`;

const Wrapper = styled.div`
    min-height: calc(100vh - 100px);
    position: relative;
`;

const NotFound = ({ transition }) => (
    <Wrapper style={transition && transition.style}>
        <NotFoundWrapper>
          <NotFoundContent>
            <h1>404</h1>
            <h2>Page not found!</h2>
            <p>
                <Link
                    to="/">
                    <span>GO BACK</span>
                </Link>
            </p>
          </NotFoundContent>
        </NotFoundWrapper>
    </Wrapper>
)

export default NotFound