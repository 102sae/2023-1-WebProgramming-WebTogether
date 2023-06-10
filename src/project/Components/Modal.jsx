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

  p {
    margin: 5px 0;
  }
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
  overflow: auto;
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

export const GPT_API_KEY = import.meta.env.VITE_GPT_API_KEY;

async function chat(question) {
  return await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GPT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    }),
  })
    .then((res) => res.json())
    .then((data) => data.choices[0].message.content);
}

function Modal({ isOpen, closeModal, content, selectedKey }) {
  const [selectedNews, setSelectedNews] = useState({});
  const [summaryNews, setSummaryNews] = useState("");
  const [keywords, setKeywords] = useState([]);

  const onSubmit = (inputValue) => {
    var input = inputValue;
    let questionSummary =
      "[text from: " + input + "] 이 뉴스를 영어 말고 한국어로 요약해줘.";
    chat(questionSummary).then((answer) => {
      setSummaryNews(answer);
      console.log(`본문: ${answer}`);
    });

    let questionKeyword =
      input +
      "이 뉴스의 카테고리를 정했을 때 정치, 경제, 사회, 생활/문화, 세계, 기술/IT, 연예, 스포츠 중에서 가장 유사한거 하나 선택 후 키워드를 추출해줘. 요약 하지 말고 예시처럼 키워드만 무조건 간단하게 3개 이내로 텍스트만 추출해줘. 예시) 연예,스캔들";
    chat(questionKeyword).then((answer) => {
      console.log(`키워드: ${answer}`);
      setKeywords(answer.split(","));
      console.log(keywords);
    });
  };

  useEffect(() => {
    if (isOpen) {
      const selectedValue = content[selectedKey];

      setSelectedNews(selectedValue);
      console.log(selectedValue.date);
    }
  }, [isOpen, content, selectedKey]);

  useEffect(() => {
    if (selectedNews) {
      console.log(selectedNews.text);
      onSubmit(selectedNews.text); //gpt 전송
    }
  }, [selectedNews]);

  return (
    <ModalOverlay style={{ display: isOpen ? "block" : "none" }}>
      <ModalWindow>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <ModalTitle>제목 :{selectedKey}</ModalTitle>
        <ModalMain>
          <ModalContentSummary>
            <p>{summaryNews} </p>
          </ModalContentSummary>
          <ModalContentInfo>
            <div>
              <p>언론사 : </p>
              <p>작성날짜:{selectedNews.date} </p>
              <p>기자 : </p>
              <p>
                링크 :{" "}
                <a
                  href={selectedNews.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedNews.link}
                </a>
              </p>
            </div>
          </ModalContentInfo>
        </ModalMain>
        <ModalContentBody>
          <p>{selectedNews.text}</p>
        </ModalContentBody>

        <KeywordGroup>
          {keywords.map((keywordItem, index) => (
            <Keyword key={`keyword_${index}`}>{keywordItem}</Keyword>
          ))}
        </KeywordGroup>
      </ModalWindow>
    </ModalOverlay>
  );
}

export default Modal;
