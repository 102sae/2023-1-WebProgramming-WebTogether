import React from "react";
import Article from "./Article";
import Modal from './Modal';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const MYPAGETITLE = styled.h1`
  color:white;
  display:flex;
  justify-content:center;
`
const DateWrapper = styled.div`
  width:72%;
  margin: 30px auto;
`;

const DateHeading = styled.h1`
  font-weight: bold;
  font-size: 20px;
  color:#ffffff80;
`;

function MypageMain({ scrappedData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [selectedContentKey, setSelectedContentKey] = useState('');
  const closeModal = () => setIsModalOpen(false);

  const sortedDates = Object.keys(scrappedData).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div style={{marginTop:"100px"}}>
      <MYPAGETITLE>MYPAGE</MYPAGETITLE>
      {sortedDates.map((date) => (
        <DateWrapper key={date}>
          <DateHeading>스크랩 날짜: {date}</DateHeading>
          {scrappedData[date].map((article, index) => (
            <Article
              key={`article_${index}`}
              title={article.selectedKey}
              date={article.content.date}
              onClick={() => {
                setIsModalOpen(true);
                const contentDict = {};
                contentDict[article.selectedKey] = article.content;
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
        showScrapButton={false}
      />
    </div>
  );
}

export default MypageMain;
