import React, { Component } from 'react';
import styled from 'styled-components'
import RustyAnnouncments from '../components/RustyAnnouncments'
// import Markdown from 'react-markdown'

const Wrapper = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    align-items: center;
    align-content: center;
`;

const Rusty = ({ data, transition, props }) =>{
  const {markdownRemark: RustyPage} = data
  const {frontmatter, html } = RustyPage
  return(
      <Wrapper style={transition && transition.style}>
      <div style={{width: "100%"}}>
        <Wrapper style={transition && transition.style}>
          <RustyAnnouncments/>
        </Wrapper>
        <br/>
        <div style={{color: "white"}} dangerouslySetInnerHTML={{__html: html}}/>
      </div>
        
      </Wrapper>
  )
}

export const pageQuery = graphql`
  query RustyPage {
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
export default Rusty