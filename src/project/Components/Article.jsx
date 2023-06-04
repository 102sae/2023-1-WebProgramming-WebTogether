import React from "react";
import styled from "styled-components";

const ArticleStyle = styled.div`
width: 99%;
  height: 80px;
  border-radius: 10px;
  background-color: #242424;
  margin: 10px auto;
  display: flex;
  align-items: center;

  text-decoration: none;
  font-size:18px;

  &:hover {
    cursor:pointer;
  }
`;

const Title = styled.p`
width:70%;
  padding:20px;
  font-weight: bolder;
  color:white;
  font-size:23px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  `;

const Press = styled.p`
width:20%;
  padding:20px;
  color:white;
`;

const Date = styled.p`
width:10%;
  padding:20px;
  color:gray;
`;

function Article(props) {
    return (
        <ArticleStyle onClick={props.onClick}>
            <Title>{props.title}</Title>
            <Press>{props.press}</Press>
            <Date>{props.date}</Date>
        </ArticleStyle>
    );
}

export default Article;