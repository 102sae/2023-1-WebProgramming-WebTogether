import React, { useState } from "react";
import styled from "styled-components";
import Article from "./Article";
import Modal from "./Modal";

const News = styled.div`
width:72%;
  margin:15px auto 0;
`;

const ArticleCnt = styled.p`
margin-top:85px;
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

const Page = styled.div`
display:flex;
  justify-content: center;
  align-items: center;
  color:white;
  font-size: 20px;
`;

function SearchingMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <News>
      <ArticleCnt>검색결과 약 4,720,000개</ArticleCnt>
      <ArticleList>
        <Article title="뉴스기사1111" press="언론사1" date="2000-00-00" onClick={ openModal }/>
        <Article title="뉴스기사2" press="언론사2" date="2000-00-00" onClick={ openModal }/>
        <Article title="뉴스기사3" press="언론사3" date="2000-00-00" onClick={ openModal }/>
        <Article title="뉴스기사4" press="언론사4" date="2000-00-00" onClick={ openModal }/>
        <Article title="뉴스기사5" press="언론사5" date="2000-00-00" onClick={ openModal }/>
      </ArticleList>

      <Page>
        <div id="prevPageBtn">
          <i className="fas fa-angle-left"></i>
        </div>
        <p id="pagination"></p>
        <div id="nextPageBtn">
          <i className="fas fa-angle-right"></i>
        </div>
      </Page>

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </News>
  );
}

export default SearchingMain;