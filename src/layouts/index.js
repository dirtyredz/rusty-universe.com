import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ScrollUpButton from 'react-scroll-up-button'
import AwesomeBackground from '../components/AwesomeBackground'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styled from 'styled-components'
import './index.css'
import WidgetBot from '../components/WidgetBot'


const Wrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly
`

const TemplateWrapper = ({ children }) => (
  <Wrapper>
    <AwesomeBackground/>
    <ScrollUpButton/>
    <Helmet
      title="Rusty-Universe"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    {children()}
    <WidgetBot/>
    <Footer />
</Wrapper>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
