import { useState } from "react";
import styled from "styled-components";
import Article from "./Article";
import Modal from "./Modal";

export const GPT_API_KEY = import.meta.env.VITE_GPT_API_KEY;

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

function SearchingMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    var input = "뉴스 본문이 들어가야할 자리";
    let questionSummary =
      "[text from: " + input + "] 이 뉴스를 영어 말고 한국어로 요약해줘.";
    chat(questionSummary).then((answer) => console.log(`본문: ${answer}`));
    let questionKeyword =
      input +
      "이 뉴스의 카테고리를 정했을 때 정치, 경제, 사회, 생활/문화, 세계, 기술/IT, 연예, 스포츠 중에서 가장 유사한거 하나 선택 후 키워드를 추출해줘. 요약 하지 말고 예시처럼 키워드만 무조건 간단하게 3개 이내로 괄호에 넣어서 추출해줘. 예시) (연예),(스캔들)";
    chat(questionKeyword).then((answer) => console.log(`키워드: ${answer}`));
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <News>
      <ArticleCnt>검색결과 약 4,720,000개</ArticleCnt>
      <ArticleList>
        <Article
          title="뉴스기사1111"
          press="언론사1"
          date="2000-00-00"
          onClick={openModal}
        />
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
