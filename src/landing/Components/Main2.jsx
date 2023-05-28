import React, { useState } from "react";
import styled from "styled-components";

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

const ProjectImg = styled.div`
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
  padding: 10px 30px;
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
`;

const AccordionItem = styled.div`
  border-radius: 10px;
  margin-bottom:25px;
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

  &.open {
    display: block;
  }
`;

const Main2 = () => {
  const [accordionItems, setAccordionItems] = useState([
    { id: 1, title: "프로젝트 요약", content: "프로젝트 요약 내용입니다." },
    { id: 2, title: "프로젝트 역할", content: "프로젝트 역할 내용입니다." },
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
      <ProjectImg>프로젝트 사진(캡쳐본이나 로고)</ProjectImg>
      <ProjectMain>
        <Accordion>
          {accordionItems.map((item) => (
            <AccordionItem key={item.id} className={item.isOpen ? "open" : ""}>
              <AccordionHeader onClick={() => toggleAccordion(item.id)}>
                <h2>{item.title}</h2>
                <i className="fas fa-angle-right"></i>
              </AccordionHeader>
              <AccordionContent className={item.isOpen ? "open" : ""}>
                <p>{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <ProjectRight>
          <ProjectInfo>
            <InfoTitle>프로젝트 설명</InfoTitle>
            <Info>
              프로젝트 설명 ~ ~ 어쩌구 저쩌구 프로젝트 설명 ~ ~ 어쩌구 저쩌구
              <br />
              프로젝트 설명 ~ ~ 어쩌구 저쩌구 프로젝트 설명 ~ ~ 어쩌구 저쩌구
              <br />
              프로젝트 설명 ~ ~ 어쩌구 저쩌구 프로젝트 설명 ~ ~ 어쩌구 저쩌구
              <br />
              프로젝트 설명 ~ ~ 어쩌구 저쩌구 프로젝트 설명 ~ ~ 어쩌구 저쩌구
              <br />
              프로젝트 설명 ~ ~ 어쩌구 저쩌구 프로젝트 설명 ~ ~ 어쩌구 저쩌구
              <br />
            </Info>
          </ProjectInfo>
        </ProjectRight>
      </ProjectMain>
    </MainWrapper>
  );
};

export default Main2;
