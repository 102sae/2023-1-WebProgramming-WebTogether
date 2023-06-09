import React, { forwardRef } from "react";
import styled from "styled-components";

const Main = styled.section`
  height: 660px;
  padding-top: 10px;
  background-color: #d2d2d2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 80px;
`;

function Masthead() {
  return (
    <Main>
      <p>동국대학교 웹프로그래밍 팀프로젝트</p>
    </Main>
  );
}

export default Masthead;
