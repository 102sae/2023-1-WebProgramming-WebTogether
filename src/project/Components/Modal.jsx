import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
`;

const ModalWindow = styled.div`
  border-radius: 25px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  overflow: auto;
  width: 1200px;
  height: 660px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bolder;
`;

const ModalTitle = styled.h1`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
`;

const ModalMain = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  margin-bottom: 10px;
`;

const ModalContentSummary = styled.div`
  width: 70%;
  height: 100%;
  background-color: #d2d2d280;
  margin-right: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ModalContentInfo = styled.div`
  width: 34%;
  height: 100%;
  background-color: #d2d2d280;
  display: flex;
  
  border-radius: 10px;
  div {
    flex: 1;
    word-wrap: break-word;
  }

  p{
    
    margin:5px 0;
    
    
  }
`;

const ModalContentBody = styled.div`
width: 100%;
height: 40%;
background-color: #D2D2D280;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 10px;
border-radius: 10px;
overflow:auto;
`;

const KeywordGroup = styled.div`
width: 100%;
  height: 9%;
  /* background-color: #D2D2D2; */
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Keyword = styled.div`
width: 10%;
  height: 45px;
  background-color: #D2D2D2;
  border-radius: 20px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`



function Modal({ isOpen, closeModal, content, selectedKey }) {
  const [selectedNews, setSelectedNews] = useState({});

  useEffect(() => {
    if (isOpen) {

      const selectedValue = content[selectedKey];

      setSelectedNews(selectedValue);
      console.log(selectedValue.date);
    }

  }, [isOpen, content, selectedKey]);


  return (
    <ModalOverlay style={{ display: isOpen ? "block" : "none" }}>
      <ModalWindow>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <ModalTitle>제목 :{selectedKey}</ModalTitle>
        <ModalMain>
          <ModalContentSummary>
            <p>요약문 </p>
          </ModalContentSummary>
          <ModalContentInfo>
            <div>
              <p>언론사 : </p>
              <p>작성날짜:{selectedNews.date} </p>
              <p>기자 : </p>
              <p>링크 : <a href={selectedNews.link} target="_blank" rel="noopener noreferrer">{selectedNews.link}</a></p>

            </div>

          </ModalContentInfo>
        </ModalMain>
        <ModalContentBody>
          <p>{selectedNews.text}</p>
        </ModalContentBody>

        <KeywordGroup>
          <Keyword>키워드1</Keyword>
          <Keyword>키워드2</Keyword>
          <Keyword>키워드3</Keyword>
        </KeywordGroup>
      </ModalWindow>
    </ModalOverlay>
  );
}

export default Modal;
