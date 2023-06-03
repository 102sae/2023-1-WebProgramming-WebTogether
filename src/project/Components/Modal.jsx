import React, { useState } from "react";
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
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ModalContentBody = styled.div`
  width: 100%;
  height: 40%;
  background-color: #d2d2d280;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 10px;
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
  background-color: #d2d2d2;
  border-radius: 20px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Modal({ isOpen, closeModal }) {
  return (
    <ModalOverlay style={{ display: isOpen ? "block" : "none" }}>
      <ModalWindow>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <ModalTitle>뉴스기사 제목</ModalTitle>
        <ModalMain>
          <ModalContentSummary>
            <p>요약문</p>
          </ModalContentSummary>
          <ModalContentInfo>
            <p>언론사 : </p>
            <p>작성날짜 : </p>
            <p>기자 : </p>
            <p>링크 : </p>
          </ModalContentInfo>
        </ModalMain>
        <ModalContentBody>
          <p>기사본문</p>
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
