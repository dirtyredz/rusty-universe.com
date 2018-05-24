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
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

class TemplateWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state={Loaded: true}
    }
    onLoaded(){
        //this.setState({Loaded: true})
    }
    componentDidMount(){

    }
    render(){
        if(this.state.Loaded){
            return(

                <Wrapper>
                    <Helmet
                      title="Rusty-Universe"
                      meta={[
                        { name: 'description', content: 'Sample' },
                        { name: 'keywords', content: 'sample, something' },
                      ]}
                    />
                    <AwesomeBackground/>
                    <Header />
                    {this.props.children()}
                    <Footer />
                    <WidgetBot/>
                    <ScrollUpButton/>
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
