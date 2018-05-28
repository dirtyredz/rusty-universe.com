import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ScrollUpButton from 'react-scroll-up-button'
import AwesomeBackground from '../components/AwesomeBackground'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styled, { injectGlobal } from 'styled-components'
import './index.css'
import WidgetBot from '../components/WidgetBot'
import galaxy from '../components/resources/galaxy.jpg'
import TallLean from '../components/resources/Tall & Lean.ttf'
import Borg from '../components/resources/Borg.ttf'
import Elixia from '../components/resources/ELIXIA.ttf'
import EuroStyle from '../components/resources/EUROS3.ttf'
import FontFaceObserver from 'fontfaceobserver'
import RustyAnnouncments from '../components/RustyAnnouncments'
import ReactMarkdown from 'react-markdown'

const Wrapper = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    align-items: center;
    align-content: center;
`;

const sitePageTemplate = ({ data, transition, props }) =>{
  const { markdownRemark: sitePage } = data
  const { frontmatter } = sitePage
  return(
    <Wrapper style={transition && transition.style}>
      <div style={{
          width: "100%",
          color: "white",
          marginLeft: "10%",
          marginRight: "10%"
        }}>
          <ReactMarkdown
            escapeHtml={false}
            source={frontmatter.markdown}
          />,
      </div>
    </Wrapper>
  )
}

export const pageQuery = graphql`
query sitePage($path: String) {
    markdownRemark(frontmatter: {path: { eq: $path } }) {
      frontmatter {
        title
        description
        markdown
      }
    }
  }
`;

export default sitePageTemplate
