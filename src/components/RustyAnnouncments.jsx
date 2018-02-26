import React, { Component } from 'react';
import styled from 'styled-components'
import SanitizeHtml from 'sanitize-html'
import { Scrollbars } from 'react-custom-scrollbars';

const AnnouncmentsContainer = styled(Scrollbars)`
    color: white;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
    background: #36393eb5;
    border-radius: 10px;
    font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
    @media (max-width: 767px) {
        width:95%;
        margin-left: 2.5%;
        margin-right: 2.5%;
    }
`
const Announcment = styled.div`
    padding: 20px;
    display: block;
    font-size: 17px;
    color: rgba(255,255,255,0.7);
    margin-top: 6px;
    overflow-wrap: break-word;
    -ms-word-break: break-all;
    word-wrap: break-word;
    word-break: break-word;
    line-height: 1.1em;
    white-space: pre-wrap;
`
const Author = styled.div`
    color: rgb(207, 37, 37);
    padding-bottom: 5px;
    font-size: 20px;
    letter-spacing: 0;
    font-weight: 500;

`
const Message = styled.div`
    padding-left: 20px;
`
const HighlightedMessage = styled(Message)`
    margin-left: 20px;
    display: block;
    background: #faa61a4f;
    border-left: 4px solid #FAA61A;
    border-radius: 3px;
    padding: 0 2px 0;
`
const DiscordATag = styled.a`
    color: #6497f5;

    text-decoration: none;
    &:visited{
        color: #6497f5;
    }
    &:hover{
        text-decoration: underline;
    }
`
const Mention = styled.span`
    color: #6497f5;
`
const CodeBlock = styled.div`
    border: 1px solid black;
    background-color: #2e3136 !important;
    font-family: Menlo, Consolas, Monaco, monospace;
    font-size: 14px;
    line-height: 16px;
    padding: 7px;
    margin: 1px;
    display: block;
    border-radius: 5px;
    color: #839496 !important;
    font-weight: 100 !important;
`
class RustyAnnouncments extends React.Component {
    constructor(props){
        super(props)
        this.state = {Announcments: false}
    }
    componentDidMount(){
        fetch("https://dirtybot.dirtyredz.com/")
        .then((response) => {return response.json()})
        .then((responseObject) => {
            this.setState({Announcments: responseObject})
        })
        .catch((err) => {console.log("Fetch error: " + err);});
    }
    HighlightEveryone(m,jsx){
        if(m.content.includes('@everyone')){
            return <HighlightedMessage>{jsx}</HighlightedMessage>
        }else{
            return <Message>{jsx}</Message>
        }
    }
    render() {
        return(
            <AnnouncmentsContainer style={{ height: 300 }}>
                {this.state.Announcments ?
                    this.state.Announcments.map((m)=>{
                        //m.content = SanitizeHtml(m.content)
                        //let re = /(```)/gi;
                        //let result = m.content.search(re);
                        let backTick = m.content.match(/(```(.*?)```)/gi)
                        let result = m.content.split('```')
                        m.content = m.content.replace(/```/g,"")

                        let CodeExample = null
                        if(result.length > 1){
                            CodeExample = result[1].replace(/\n/g,'_n_')
                            CodeExample = CodeExample.replace(/\s/g,'_s_')
                            m.content = m.content.replace(result[1],"CODEBLOCK:"+CodeExample)
                        }

                        let Lines = m.content.split('\n')
                        Lines = Lines.map((line)=>{
                            let Words = line.split(' ')
                            Words = Words.map((word)=>{
                                let testUrl = word.match(/(https?:[^\s]+)/)
                                let onlyUrl = testUrl && testUrl[1];
                                if(onlyUrl){
                                    return <DiscordATag target="_blank" href={onlyUrl}>{onlyUrl}</DiscordATag>
                                }
                                if(word === '@everyone'){
                                    return <Mention>{word} </Mention>
                                }
                                if(word.includes("CODEBLOCK:")){
                                    word = word.replace(/_n_/g,"\n")
                                    word = word.replace(/_s_/g," ")
                                    word = word.replace("CODEBLOCK:","")
                                    let CodeBlockLines = word.split('\n')
                                    CodeBlockLines = CodeBlockLines.map((line)=>{
                                        if(line === ""){
                                            return false
                                        }
                                        return <span>{line}<br/></span>
                                    })
                                    return <CodeBlock>{CodeBlockLines}</CodeBlock>
                                }
                                return <span>{word} </span>
                            })
                            return <div>{Words}<br/></div>
                        })

                        return(
                            <Announcment>
                                <Author>{m.author}</Author>
                                {this.HighlightEveryone(m,Lines)}
                            </Announcment>
                        )
                    })

                :""}
              </AnnouncmentsContainer>

        )
    }
}

export default RustyAnnouncments