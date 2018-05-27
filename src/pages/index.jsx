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
const Home = ({ data, transition, props }) =>(
    <Wrapper style={transition && transition.style}>
        <CenterLinks data={data}/>
    </Wrapper>
)

export const pageQuery = graphql`
  query RustyPageExsists {
    markdownRemark(frontmatter: {title: {eq: "Rusty"} }) {
      html
      frontmatter {
        title
        description
        markdown
      }
    }
  }
`;
export default Home