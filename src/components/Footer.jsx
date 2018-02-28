import React from "react";
import styled from 'styled-components'
import StyledA from './StyledA'

const Footer = styled.div`
    flex: 1;
    width: 100%;
    height: 75px;
    max-height: 75px;
    color: white;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    text-align: center;
    @media (max-width: 767px) {
        flex-direction: column;
        padding-top: 20px;
    }
`;

const Item = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 50px;
    padding-right: 50px;
`;

const Inline = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;

`
export default () => {
    return(
        <Footer>
            <Item>
                <Inline>
                    <StyledA href="https://rusty-universe.com/admin/" text="ADMINS"/>
                    <StyledA target="_blank" href="http://www.avorion.net/forum/index.php/topic,798.0.html" text="FORUM"/>
                </Inline>
            </Item>
            <Item>
                DEVELOPED BY DAVID MCCLAIN | DIRTYREDZ.COM
                <br/>
                MUSIC AND SOUND BY FIRETAIL STUDIOS
            </Item>
        </Footer>
    )
}
