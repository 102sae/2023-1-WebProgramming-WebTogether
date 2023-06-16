import { useState } from "react";
import styled from "styled-components";
import Article from "./Article";
import Modal from "./Modal";


const News = styled.div`
  width: 72%;
  margin: 15px auto 0;
`;

const ArticleCnt = styled.p`
  margin-top: 85px;
  color: #ffffff80;
  text-align: right;
`;

const ArticleList = styled.div`
  width: 100%;
  height: 900px;
  /* background: #D2D2D2; */
  padding-top: 1px;
  margin: 0 auto;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
`;

function SearchingMain({ content }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNewsKey, setSelectedNewsKey] = useState("");
  
  const closeModal = () => setIsModalOpen(false);

  const openModal = (key) => {
    setSelectedNewsKey(key);
    setIsModalOpen(true);
  };

  return (
    <News>
      <ArticleCnt>검색결과 {Object.keys(content).length}개</ArticleCnt>
      <ArticleList>
        {Object.entries(content).map(([key, value]) => (
          <Article
            key={key}
            title={key}
            date={value.date}
            onClick={() => openModal(key)}
          />
        ))}
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

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={content}
        selectedKey={selectedNewsKey}
        showScrapButton={true}
        
      />
      
    </News>
  );
}

export default SearchingMain;
