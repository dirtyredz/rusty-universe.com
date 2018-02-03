import React from "react";
import styled from 'styled-components';

const StyledDiv = styled.div`
  opacity: 1;
  height: 50%;
  transition: opacity 2s;
  float: left;
`;
const StyledSVG = styled.svg`
  height: 100%;
  width: 100%;
  display: inline-block;
  stroke-width: 0;
  stroke: 'currentColor';
  fill: 'currentColor';
`;

export default (props) => {
    return (
        <StyledDiv>
            <StyledSVG style={props.style} viewBox={props.viewbox}>
                {props.children}
            </StyledSVG>
        </StyledDiv>
    );
}
