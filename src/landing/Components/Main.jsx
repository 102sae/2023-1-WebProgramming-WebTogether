import React from "react";
import styled from "styled-components";
import Masthead from "./Masthead";
import TeamSection from "./Teamsection";

const Middle = styled.div`
  margin-top: 100px;
  width: 100%;
  height: fit-content;
`;

function Main() {
  return (
    <Middle>
      <Masthead/>
      <TeamSection/>
    </Middle>
  );
}

export default Main;
