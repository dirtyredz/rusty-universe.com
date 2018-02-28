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
import galaxy from '../components/resources/galaxy.jpg'


const Wrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly
`

class TemplateWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state={Loaded: false}
    }
    onLoaded(){
        this.setState({Loaded: true})
    }
    render(){
        if(this.state.Loaded){
            return(

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
                  {this.props.children()}
                  <WidgetBot/>
                  <Footer />
              </Wrapper>
            )
        }else{
            return(
                <img height="1" width="1" onLoad={this.onLoaded.bind(this)} src={galaxy}/>
            )
        }

    }
}


TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
