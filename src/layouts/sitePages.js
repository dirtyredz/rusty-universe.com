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

const Wrapper = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    align-items: center;
    align-content: center;
`;

const sitePageTemplate = ({ data, transition, props }) =>{
  const {markdownRemark: sitePage} = data
  const {frontmatter, html } = sitePage
  return(
    <Wrapper style={transition && transition.style}>
      <div dangerouslySetInnerHTML={{__html: frontmatter.markdown}}/>
    </Wrapper>
  )
}

export const pageQuery = graphql`
query sitePage($path: String) {
    markdownRemark(frontmatter: {title: {ne: "Rusty"}, path: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        markdown
      }
    }
  }
`;

export default sitePageTemplate
