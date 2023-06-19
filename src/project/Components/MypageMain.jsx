import React from "react";
import Article from "./Article";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import styled from "styled-components";

const DateWrapper = styled.div`
  margin-bottom: 20px;
  padding-top: 100px;
`;

const DateHeading = styled.h1`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 10px;
  color: white;
`;

function MypageMain({ scrappedData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [selectedContentKey, setSelectedContentKey] = useState("");
  const [summary, setSummary] = useState("");
  const [keyword, setKeyword] = useState([]);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {Object.keys(scrappedData).map((date) => (
        <DateWrapper key={date}>
          <DateHeading>스크랩한 날짜: {date}</DateHeading>
          {scrappedData[date].map((article, index) => (
            <Article
              key={`article_${index}`}
              title={article.selectedKey}
              date={article.content.date}
              onClick={() => {
                setIsModalOpen(true);
                const contentDict = {};
                contentDict[article.selectedKey] = article.content;
                setSummary(article.summary);
                setKeyword(article.keyword);
                setSelectedContent(contentDict);
                setSelectedContentKey(article.selectedKey);
              }}
            />
          ))}
        </DateWrapper>
      ))}

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={selectedContent}
        selectedKey={selectedContentKey}
        scrappedSummary={summary}
        scrappedKeywords={keyword}
        showScrapButton={false}
      />
    </div>
  );
}

export default MypageMain;
