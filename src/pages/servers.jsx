import React, { Component } from 'react';
import styled from 'styled-components'
import ServerCard from '../components/ServerCard'

const Wrapper = styled.div`
    min-height: calc(100vh - 200px);
    position: relative;
    padding-bottom: 100px;
`;
const ServerWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    padding-left: 10%;
    flex-wrap: wrap;
    padding-right: 10%;
    width: 80%;
`

const Home = ({ data, transition }) => (
    <Wrapper style={transition && transition.style}>
        <ServerWrapper>
            {data.servers.edges.map((a)=>{
                console.log(a.node.frontmatter)
                return <ServerCard
                    key={a.node.frontmatter.title + "_Container"}
                    country={a.node.frontmatter.country}
                    title={a.node.frontmatter.title}
                    interface={a.node.frontmatter.interface}
                    ip={a.node.frontmatter.ip}/>
            })}
        </ServerWrapper>
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