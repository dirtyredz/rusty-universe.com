import React from "react";
import styled, { injectGlobal } from 'styled-components'
import RustyLogo from './RustyLogo'
import TallLean from './resources/Tall & Lean.ttf'
import { fallDown as Menu } from 'react-burger-menu'
import Link from "gatsby-link";
import { MdVolumeDown, MdVolumeMute, MdVolumeOff, MdVolumeUp } from 'react-icons/lib/md'
import { mute, unMute } from "../redux/volume";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    volume: state.volume
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mute, unMute }, dispatch);
}

class Header extends React.Component {
    constructor(){
        super();
        this.state = {
          Loaded: false,
          MenuOpen: false,
          Volume: 'Up'
        };
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({Loaded: true});
        },500);
        setInterval(()=>{
          if(this.state.Volume !== 'Off'){
            if(this.state.Volume === 'Down'){
              this.setState({Volume: 'Up'})
            }else if(this.state.Volume === 'Up'){
              this.setState({Volume: 'Mute'})
            }else if(this.state.Volume === 'Mute'){
              this.setState({Volume: 'Down'})
            }
          }
        },1000)
    }
    CloseMenu(){
      console.log('test')
      this.setState({MenuOpen: false})
    }
    MuteUnMute(){
      console.log('Clicked')
      if(this.state.Volume !== "Off"){
        this.setState({Volume: 'Off'},this.props.mute)
      }else{
        this.setState({Volume: 'Up'},this.props.unMute)
      }
    }
    isMenuOpen(state) {
      this.setState({MenuOpen: state.isOpen})
    };
    render(){
      var styles = {
        bmBurgerButton: {
          float: 'right',
          position: 'relative',
          width: '47px',
          height: '43px',
          right: '36px',
          top: '29px'
        },
        bmBurgerBars: {
          background: '#ffffff'
        },
        bmCrossButton: {
          height: '24px',
          width: '24px'
        },
        bmCross: {
          background: '#bdc3c7'
        },
        bmMenu: {
          background: '#373a47',
          padding: '2.5em 1.5em 0',
          fontSize: '1.15em'
        },
        bmMorphShape: {
          fill: '#373a47'
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em',
          height: '96%'
        },
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0.3)'
        }
      }
      var ActiveStyle = {
        color: 'grey',
        pointerEvents: 'none'
      }
      let Volume = ()=>{
        if(this.state.Volume === 'Down'){
          return <MdVolumeDown className="VolumeControl" style={{ marginRight: 124.68747}}/>
        }else if(this.state.Volume === 'Up'){
          return <MdVolumeUp className="VolumeControl" style={{ marginRight: 119.9}}/>
        }else if(this.state.Volume === 'Mute'){
          return <MdVolumeMute className="VolumeControl" style={{ marginRight: 130}}/>
        }else if(this.state.Volume === 'Off'){
          return <MdVolumeOff className="VolumeControl" style={{ marginRight: 120}}/>
        }
      }
      return(
        <StyledHeader style={(this.state.Loaded) ? Loaded : {}}>
          <RustyLogo/>
          <Title>RUSTY-UNIVERSE</Title>
          <Menu
            onStateChange={ this.isMenuOpen.bind(this) }
            isOpen={ this.state.MenuOpen } 
            styles={styles}
              width={ 280 }
              right
            >
            <StyledLink
              exact 
              activeStyle={ActiveStyle}
              to="/"
              onClick={this.CloseMenu.bind(this)}
            >
              <span>HOME</span>
            </StyledLink>
            <StyledLink
              exact 
              activeStyle={ActiveStyle}
              to="/Rewards"
              onClick={this.CloseMenu.bind(this)}
            >
              <span>DONATE</span>
            </StyledLink>
            <StyledLink
              exact 
              activeStyle={ActiveStyle}
              to="/Servers"
              onClick={this.CloseMenu.bind(this)}
            >
              <span>SERVERS</span>
            </StyledLink>
            {this.props.data ? 
              this.props.data.allMarkdownRemark.edges.map(link=>{
                return(
                  <StyledLink
                    exact 
                    activeStyle={ActiveStyle}
                    to={link.node.frontmatter.path}
                    onClick={this.CloseMenu.bind(this)}
                  >
                    <span>{link.node.frontmatter.title.toUpperCase()}</span>
                  </StyledLink>
                )
              })
            : null}
          </Menu>
          {this.state.Volume === "down"}
          <div onClick={this.MuteUnMute.bind(this)}><Volume/></div>
        </StyledHeader>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

injectGlobal`
  @font-face {
    font-family: 'TallLean';
    src: url('${TallLean}');
  }
  .bm-menu-wrap {
    z-index: 2147483001 !important;
  }
  .VolumeControl{
    height: 60px;
    width: 60px;
    float: right;
    fill: white;
    margin-right: 100px;
    margin-top: 20px;
    cursor: pointer;
  }
  .VolumeControl:hover{
    fill: grey;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  transition: color .3s;
  font-size: 25px;
  padding: 8px;
  &:visited{
    color: #fff;
  }
  &:hover{
    color: grey;
  }
`
const StyledHeader = styled.header`
    width: 100%;
    height: 100px;
    max-height: 100px;
    flex: 1;
    opacity: 0;
    transition: opacity 1s;
`;
const Title = styled.div`
  float: left;
    font-family: "TallLean";
    font-size: calc(50px + 20 * ((100vw - 320px) / 1360));
    color: white;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    height: 100%;
    white-space: nowrap;
`;
const Loaded = {
    opacity: 1
}