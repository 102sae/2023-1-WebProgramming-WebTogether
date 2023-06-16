import { useState, useEffect } from "react";
import styled from "styled-components";
import { FadeLoader } from "react-spinners";

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
  p {
    padding: 25px 15px;
  }
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
    padding: 25px 15px;
  }

  p {
    margin: 5px 0;
  }
`;

const ModalContentBody = styled.div`
  width: 100%;
  height: auto;
  background-color: #d2d2d280;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: auto;
  p {
    padding: 25px 15px;
  }
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

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.div`
  padding: 8px 5px;
  color: #5b5b5b;
  text-align: center;
`;

const ScrapButton = styled.button`
  position: absolute;
  right:10px;
  
  background-color: #5b5b5b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 8px 16px;
`;


export const GPT_API_KEY = import.meta.env.VITE_GPT_API_KEY;

function Modal({ isOpen, closeModal, content, selectedKey,showScrapButton }) {
  const [selectedNews, setSelectedNews] = useState({});
  const [summaryNews, setSummaryNews] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrapped,setIsScrapped]=useState(false);


  async function chat(question) {
    setLoading(true);
    setSummaryNews("");
    setKeywords([]);
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

  const onSubmit = (inputValue) => {
    var input = inputValue;
    if (input) {
      let questionSummary =
        "[text from: " + input + "] 이 뉴스를 영어 말고 한국어로 요약해줘.";
      chat(questionSummary).then((answer) => {
        setSummaryNews(answer);
        console.log(`본문: ${answer}`);
        setLoading(false);
      });

      let questionKeyword =
        input +
        "이 뉴스의 카테고리를 정했을 때 정치, 경제, 사회, 생활/문화, 세계, 기술/IT, 연예, 스포츠 중에서 가장 유사한거 하나 선택 후 키워드를 추출해줘. 요약 하지 말고 예시처럼 키워드만 무조건 간단하게 3개 이내로 텍스트만 추출해줘. 예시) 연예,스캔들";
      chat(questionKeyword).then((answer) => {
        console.log(`키워드: ${answer}`);
        setKeywords(answer.split(","));
        console.log(keywords);
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      
      const selectedValue = content[selectedKey];

      setSelectedNews(selectedValue);
      //console.log(selectedValue.date);
    }
  }, [isOpen, content, selectedKey]);

  useEffect(() => {
    if (selectedNews === undefined) {
      console.log("nothing");
    } else {
      console.log(selectedNews.text);
      onSubmit(selectedNews.text); //gpt 전송
    }
  }, [selectedNews]);

  const onScrap =() =>{

    const today=new Date().toLocaleDateString(); //오늘 날짜
    const scrappedData=JSON.parse(localStorage.getItem('scrapped')) || {};
    console.log(scrappedData);
    if(!scrappedData[today]){
      scrappedData[today]=[];
    }
    
    // 이미 존재하는 기사인지 확인 
    const existingKeys=scrappedData[today].map(item => item.selectedKey);
    if(!existingKeys.includes(selectedKey)){
      scrappedData[today].push({
        content:selectedNews,
        selectedKey:selectedKey,
      });
      localStorage.setItem('scrapped',JSON.stringify(scrappedData));
    }
    setIsScrapped(true);

  }



  

  return (
    <ModalOverlay style={{ display: isOpen ? "block" : "none" }}>
      <ModalWindow>
        <CloseButton onClick={()=>{
          closeModal();
          setIsScrapped(false);
        }}>X</CloseButton>
        <ModalTitle>{selectedKey}</ModalTitle>
        <ModalMain>
          <ModalContentSummary>
            <p>
              {loading ? (
                <LoadingWrap>
                  <FadeLoader
                    color="#5b5b5b"
                    height={15}
                    margin={0}
                    radius={2}
                    width={5}
                  />
                  <LoadingText>
                    요약문을 로딩중입니다.
                    <br /> 너무 길어지면 새로고침을 해주세요.
                  </LoadingText>
                </LoadingWrap>
              ) : (
                summaryNews
              )}
            </p>
          </ModalContentSummary>
          <ModalContentInfo>
            <div>
              <p>
                <span style={{ fontWeight: "bold" }}>작성 날짜 : </span>
                {selectedNews.date}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>링크 : </span>
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
        {
          showScrapButton && (
            <ScrapButton onClick={onScrap}>{isScrapped ? "✔ 스크랩됨" : "스크랩"}</ScrapButton>
          )
        }
        
      </ModalWindow>
    </ModalOverlay>
  );
}

export default Modal;
