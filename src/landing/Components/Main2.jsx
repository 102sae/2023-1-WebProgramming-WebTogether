import { useState } from "react";
import styled from "styled-components";
import projectImg from "../../assets/projectImg.jpg";

const MainWrapper = styled.div`
  margin-top: 110px;
`;

const TitleSection = styled.div`
  width: 75%;
  height: 150px;
  border-radius: 10px;
  margin: 10px auto;
  background-color: #242424;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bolder;
`;

const SubTitle = styled.p`
  margin-top: -30px;
  font-size: 20px;
  color: #828282;
`;

const ProjectImg = styled.img`
  width: 55%;
  height: 400px;
  margin: 20px auto;
  background-color: #242424;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectMain = styled.div`
  width: 75%;
  height: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const ProjectRight = styled.div`
  width: 62%;
  height: 100%;
`;

const ProjectInfo = styled.div`
  width: 91%;
  height: max-content;
  padding: 20px 30px;
  background-color: #1e1e1e;
  border-radius: 10px;
  border: 2px solid #ffffff80;
  font-weight: bolder;
`;

const InfoTitle = styled.h2`
  color: white;
  margin-bottom: 30px;
`;

const Info = styled.p`
  color: #ffffffcc;
  line-height: 30px;
`;

const Accordion = styled.div`
  width: 35%;
  height: 100%;
  z-index: 10;
`;

const AccordionItem = styled.div`
  border-radius: 10px;
  margin-bottom: 25px;
`;

const AccordionHeader = styled.div`
  width: 100%;
  height: 18%;
  background-color: #242424;
  color: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  i {
    transition: transform 0.3s;
  }

  &.open i {
    transform: rotate(180deg);
  }
`;

const AccordionContent = styled.div`
  width: 100%;
  padding: 10px;
  display: none;
  background-color: #242424;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: -10px;
  white-space: pre-wrap; //개행문자 인식
  &.open {
    display: block;
  }
`;

const Main2 = () => {
  const [accordionItems, setAccordionItems] = useState([
    {
      id: 1,
      title: "프로젝트 요약",
      content:
        " 관심 있는 분야의 최신 뉴스를 Chat GPT가 제공하는 요약문과 키워드를 통해 간단하고 빠르게 확인할 수 있는 사이트",
    },
    {
      id: 2,
      title: "프로젝트 역할",
      content:
        "김태연 \n· 랜딩페이지 구현\n· 시작페이지 구현\n· 검색 결과 창 구현\n· 뉴스 정보 출력창\n· 마이페이지 화면 구현\n\n김정혜\n· 검색 키워드 관련 뉴스 조회 기능 구현\n· 검색 결과 로컬 스토리지에 자동 저장 기능 구현\n· 검색 기록 바탕으로 검색어 추천 기능 구현\n\n안정민\n· 뉴스에 대한 요약문 제공 기능 구현\n· 뉴스에 대한 키워드 제공 기능 구현\n· 에러 페이지 구현\n",
      content2: "",
    },
  ]);

  const toggleAccordion = (id) => {
    setAccordionItems((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <MainWrapper>
      <TitleSection>
        <Title>WEB-TOGETHER</Title>
        <SubTitle>요약으로 간단하게 읽는 뉴스 서비스</SubTitle>
      </TitleSection>
      <ProjectImg src={projectImg} alt="projectImg"></ProjectImg>
      <ProjectMain>
        <Accordion>
          {accordionItems.map((item) => (
            <AccordionItem key={item.id} className={item.isOpen ? "open" : ""}>
              <AccordionHeader onClick={() => toggleAccordion(item.id)}>
                <h2>{item.title}</h2>
                <i className="fas fa-angle-right"></i>
              </AccordionHeader>
              <AccordionContent className={item.isOpen ? "open" : ""}>
                <p style={{ padding: "0px 15px" }}>{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <ProjectRight>
          <ProjectInfo>
            <InfoTitle>프로젝트 소개</InfoTitle>
            <Info>
              관심 있는 분야의 최신 뉴스를 Chat GPT가 제공하는 요약문과 키워드를
              통해 간단하고 빠르게 확인할 수 있는 사이트
              <br />
              · 사용 가이드
              <br />
              검색창에 관심있는 뉴스를 검색한 뒤 조회할 기사를 클릭하면 해당
              기사의 본문과 함께 요약문, 키워드를 제공해준다. 사용자가 조회한
              기사들은 mypage에 저장되어 조회했던 기사들만 모아서 확인할 수
              있다.
              <br />
              · 포함 기능
              <br />
              &emsp;- 네이버 뉴스의 요약문과 키워드 제공
              <br />
              &emsp;- 검색어 자동 저장 기능
              <br />
              &emsp;- 조회한 기사 모아보기 기능
              <br />
              · 개발 환경 : React
              <br />
              · 개발 도구 : Visual Studio Code, npm
              <br />
              · 기타 사용 모듈 : axios, cheerio
              <br />· API : 네이버 검색 API, Chat gpt 3.5 API
            </Info>
          </ProjectInfo>
        </ProjectRight>
      </ProjectMain>
    </MainWrapper>
  );
};

export default Main2;
