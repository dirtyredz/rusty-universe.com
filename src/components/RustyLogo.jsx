import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  opacity: 1;
  height: 100px;
  transition: opacity 2s;
  float: left;
  padding-left: 10px;

`;
const StyledSVG = styled.svg`
  height: 100%;
  width: calc(50px + 20 * ((100vw - 320px) / 1360));
  cursor: pointer;
  display: inline-block;
  stroke-width: 0;
  stroke: white;
  fill: white;
  transition: fill 1s linear;
  &:hover{
      fill: grey;
  }
`;

export default () => {
    return (
        <StyledDiv>
            <Link  to="/">
                <StyledSVG viewBox="0 0 38 32">
                  <path d="M29.831 0.090c-2.038 0.205-4.853 1.031-7.685 2.259-5.999 2.594-12.906 7.407-16.99 11.851-3.028 3.29-4.96 6.891-5.131 9.551-0.155 2.447 1.039 3.953 3.658 4.624 0.794 0.205 0.982 0.221 2.496 0.221 1.326 0 1.817-0.041 2.562-0.18 1.915-0.368 3.437-0.81 5.238-1.539 6.425-2.603 12.464-7.39 15.321-12.145 0.532-0.876 1.187-2.275 1.105-2.357-0.049-0.057-0.025-0.098-0.483 0.704-1.956 3.372-6.146 6.907-11.163 9.42-2.275 1.138-4.526 1.923-6.449 2.251-1.367 0.229-1.8 0.237-3.184 0.049-2.234-0.295-3.298-0.679-3.961-1.432-0.687-0.786-0.704-1.915-0.049-3.568 0.548-1.383 1.727-3.372 2.783-4.698 1.481-1.858 3.486-3.847 5.442-5.402 0.336-0.27 0.63-0.516 0.655-0.54s0.336-0.262 0.687-0.532c4.076-3.045 9.289-5.909 14.601-8.004 0.638-0.254 1.203-0.458 1.244-0.458 0.049 0 0.082-0.041 0.082-0.082 0-0.049-0.025-0.074-0.057-0.074-0.041 0.008-0.36 0.041-0.72 0.082z"></path>
                  <path d="M30.617 3.486c-4.297 0.548-9.15 2.627-13.798 5.901-1.833 1.293-4.837 4.068-6.048 5.59-0.728 0.917-1.506 2.079-1.964 2.946-0.385 0.728-0.892 1.891-0.843 1.94 0.016 0.016 0.254-0.352 0.524-0.81 0.794-1.342 1.686-2.472 2.963-3.748 2.038-2.038 4.321-3.716 6.621-4.87 2.414-1.211 4.027-1.612 5.737-1.432 3.126 0.327 3.904 1.539 2.643 4.133-1.514 3.11-5.492 6.261-11.147 8.823-0.671 0.303-2.66 1.072-3.331 1.293-1.604 0.524 0.311 0.36 2.373-0.213 4.297-1.179 9.502-4.182 12.587-7.259 2.553-2.562 3.806-5.622 3.020-7.407-0.090-0.213-0.344-0.573-0.557-0.794l-0.385-0.393 0.524 0.049c0.72 0.082 1.841 0.327 2.382 0.532 2.079 0.778 2.431 2.316 1.179 5.066-1.203 2.627-3.241 5.254-6.171 7.939-1.931 1.768-4.117 3.421-6.629 5.025-3.298 2.103-7.824 4.362-11.613 5.803-1.129 0.434-0.998 0.483 0.581 0.246 3.323-0.516 7.096-1.948 11.392-4.329 1.555-0.859 1.874-1.056 3.937-2.422 4.043-2.693 7.628-5.811 9.903-8.642 1.858-2.316 3.175-4.698 3.74-6.768 0.131-0.499 0.172-0.884 0.18-1.743 0-0.974-0.025-1.162-0.196-1.596-0.311-0.794-0.589-1.17-1.228-1.686-1.318-1.064-3.74-1.506-6.375-1.17z"></path>
                  <path d="M19.74 11.294c-2.733 0.548-6.122 2.488-8.331 4.763-2.021 2.087-2.693 4.092-1.735 5.189 1.285 1.457 4.878 0.737 8.577-1.727 1.146-0.761 1.604-1.138 2.365-1.915 0.614-0.63 0.868-0.99 1.309-1.841 0.262-0.491 0.336-0.72 0.336-1.039 0-0.851-0.426-1.187-1.514-1.17-2.864 0.041-7.407 3.478-7.407 5.606 0 0.376 0.205 0.786 0.426 0.859 0.262 0.082 0.155 0.196-0.172 0.196-0.426 0-1.424-0.213-1.727-0.368-0.123-0.065-0.311-0.221-0.409-0.344-0.597-0.761 0.581-2.864 2.455-4.403 1.809-1.481 4.706-3.020 7.145-3.806 0.164-0.049 0.303-0.106 0.303-0.131 0-0.082-0.925-0.008-1.62 0.131z"></path>
                </StyledSVG>
            </Link>
        </StyledDiv>
    );
}
