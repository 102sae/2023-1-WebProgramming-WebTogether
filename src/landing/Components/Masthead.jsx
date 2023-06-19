import React from "react";
import styled from "styled-components";
import MastheadImg from "../../assets/WEB-TOGETHER.png";

const Main = styled.section`
  height: 660px;
  padding-top: 10px;
  background-color: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 80px;
`;

function Masthead() {
  return (
    <Main>
      <img src={MastheadImg} alt="" />
    </Main>
  );
}

export default Masthead;