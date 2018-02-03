import React from "react";
import styled from 'styled-components';

const Button = styled.button`
    background-color: #9bafe6;
    border: none;
    color: black;
    font-family: 'borg';
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 36px;
    cursor: pointer;
`;
const ButtonConteiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

export default (props) => {
    return (
        <ButtonConteiner>
            <Button>
                {props.children}
            </Button>
        </ButtonConteiner>
    );
}
