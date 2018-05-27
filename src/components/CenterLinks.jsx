import React from "react";
import styled, { injectGlobal } from "styled-components";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import TallLean from "./resources/Tall & Lean.ttf";

injectGlobal`
  @font-face {
    font-family: 'TallLean';
    src: url('${TallLean}');
  }
`;

const Parent = styled.div`
  width: 100%;
  color: #4d9be9;
  font-size: calc(80px + 11 * ((100vw - 320px) / 1360));
  width: 70%;
  padding-left: 15%;
  padding-right: 15%;
  text-align: center;
  font-family: "TallLean";
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Item = styled.div`
  flex-grow: 1;
  position: relative;
  opacity: 1;
  transition: opacity 1s, flex-grow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 0;
  @media (max-width: 767px) {
    width: auto;
  }
  & a {
    cursor: pointer;
    padding: 10px;
    text-shadow: none;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-flex;

    &:visited {
      color: inherit;
    }
    &:link {
      color: inherit;
    }

    &:before,
    &:after {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: white;
      content: "";
      opacity: 0;
      transition: all 0.3s;
      transform: translateY(-10px);
    }

    &:before {
      top: 0;
      transform: translateY(-10px);
    }

    &:after {
      bottom: 0;
      transform: translateY(10px);
    }

    &:hover,
    &:focus {
      color: white;

      &:before,
      &:after {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
`;

export default class CenterLinks extends React.Component {
  constructor() {
    super();
    this.state = { Loaded1: false, Loaded2: false, Loaded3: false };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ Loaded1: true });
      setTimeout(() => {
        this.setState({ Loaded2: true });
        setTimeout(() => {
          this.setState({ Loaded3: true });
        }, 500);
      }, 500);
    }, 500);
  }
  Animate(e, v) {
    e = ReactDOM.findDOMNode(e);
    v = ReactDOM.findDOMNode(v);
    e.style.opacity = 0;
    v.style.opacity = 0;
    e.style.flexGrow = "0.00001";
    v.style.flexGrow = "0.00001";
  }

  render() {
    const {markdownRemark: RustyPageExsists} = this.props.data
    const {frontmatter, html } = RustyPageExsists

    return (
      <Parent>
        <Item
          style={this.state.Loaded1 ? {} : { opacity: 0 }}
          ref={a => {
            this.One = a;
          }}
        >
          <Link
            onClick={this.Animate.bind(this, this.Two, this.Three)}
            to="/Rewards"
          >
            <span>DONATE</span>
          </Link>
        </Item>
        {this.props.data ? (
          <Item
            style={this.state.Loaded2 ? {} : { opacity: 0 }}
            ref={a => {
              this.Two = a;
            }}
          >
            <Link
              onClick={this.Animate.bind(this, this.One, this.Three)}
              to="/Rusty"
            >
              <span>RUSTY</span>
            </Link>
          </Item>
        ) : null}
        <Item
          style={this.state.Loaded3 ? {} : { opacity: 0 }}
          ref={a => {
            this.Three = a;
          }}
        >
          <Link
            to="/Servers"
            onClick={this.Animate.bind(this, this.One, this.Two)}
          >
            <span>SERVERS</span>
          </Link>
        </Item>
      </Parent>
    );
  }
}
