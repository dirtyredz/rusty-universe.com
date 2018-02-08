import React, { Component } from 'react';
import PaypalForm from '../components/PaypalForm'
import styled from 'styled-components'

const Wrapper = styled.div`
    min-height: calc(100vh - 100px);
    position: relative;
`;

const Donate = ({ data, transition, props, location }) =>(
    <Wrapper style={transition && transition.style}>
        {console.log(location)}
        <PaypalForm rank={location.state.rank} data={data}/>
    </Wrapper>
)

export const pageQuery = graphql`
  query PaypalQuery {
      rank: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/rank/"}}) {
          edges {
            node {
              frontmatter{
               title
               amount
             }
            }
          }
      }
  }
`;

export default Donate