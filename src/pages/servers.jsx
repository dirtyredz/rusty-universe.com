import React, { Component } from 'react';
import styled from 'styled-components'
import ServerCard from '../components/ServerCard'
import randomcolor from 'randomcolor'

const Wrapper = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-evenly;
    padding-left: 10%;
    flex-wrap: wrap;
    padding-right: 10%;
    width: 80%;
`;

const Home = ({ data, transition }) => (
    <Wrapper style={transition && transition.style}>
        {data.servers.edges.map((a)=>{
            return <ServerCard
                key={a.node.frontmatter.title + "_Container"}
                title={a.node.frontmatter.title}
                country={a.node.frontmatter.country}
                pvp={a.node.frontmatter.pvp}
                description={a.node.frontmatter.description}
                ip={a.node.frontmatter.ip}
                interface={a.node.frontmatter.interface}
                color={randomcolor()}
                />
        })}
    </Wrapper>
)

export const pageQuery2 = graphql`
  query ServersQuery {
      servers: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/servers/"}}) {
          edges {
            node {
              frontmatter{
               title
               country
               pvp
               description
               ip
               interface
             }
            }
          }
      }
  }
`;
export default Home