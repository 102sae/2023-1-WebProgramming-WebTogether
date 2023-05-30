import React from "react";
import styled from "styled-components";
import Article from "./Article";

const News = styled.div`
width:72%;
  margin:15px auto 0;
`;

const ArticleCnt = styled.p`
color: #FFFFFF80;
  text-align: right;
`;

const ArticleList = styled.div`
width: 100%;
  height: 900px;
  /* background: #D2D2D2; */
  padding-top: 1px;
  margin:0 auto;
`;

function SearchingMain() {
    return (
        <News>
            <ArticleCnt>검색결과 약 4,720,000개</ArticleCnt>
            <ArticleList>
                <Article title="뉴스기사1" press="언론사1" date="2000-00-00"/>
                <Article title="뉴스기사2" press="언론사2" date="2000-00-00"/>
                <Article title="뉴스기사3" press="언론사3" date="2000-00-00"/>
                <Article title="뉴스기사4" press="언론사4" date="2000-00-00"/>
                <Article title="뉴스기사5" press="언론사5" date="2000-00-00"/>
            </ArticleList>
        </News>
    );
}

export default SearchingMain;