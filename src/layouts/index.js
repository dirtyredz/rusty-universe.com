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
import { Provider } from 'react-redux'
import store from '../redux/store'
import BrowserDetection from 'react-browser-detection';

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
              <Provider store={store}>
                <BrowserDetection>
                  {{
                    ie: () =>(
                      <div>
                        <Helmet
                          title="Rusty-Universe"
                          meta={[
                            { name: 'description', content: 'Sample' },
                            { name: 'keywords', content: 'sample, something' },
                          ]}
                        />
                        <Header data={this.props.data}/>
                        <br/>
                        <br/>
                        <br/>
                        <div style={{fontSize: 30, color: "white", width: "100%", textAlign: "center"}}>This site does not support Internet Explorer, Please upgrade your browser</div>
                      </div>
                    ),
                    default: () =>(
                      <Wrapper>
                        <Helmet
                          title="Rusty-Universe"
                          meta={[
                            { name: 'description', content: 'Sample' },
                            { name: 'keywords', content: 'sample, something' },
                          ]}
                        />
                        <AwesomeBackground/>
                        <Header Menu VolumeControl data={this.props.data}/>
                        {this.props.children()}
                        <Footer />
                        <WidgetBot/>
                        <ScrollUpButton/>
                      </Wrapper>
                    ),
                  }}
                </BrowserDetection>
              </Provider>
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

export const pageQuery = graphql`
query sitePages {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/sitePages/"}}) {
    edges {
      node {
        frontmatter{
          title
          path
        }
      }
    }
}
  }
`;
export default TemplateWrapper
