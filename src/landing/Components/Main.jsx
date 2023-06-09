import { forwardRef } from "react";
import styled from "styled-components";
import Masthead from "./Masthead";
import TeamSection from "./Teamsection";

const Middle = styled.div`
  margin-top: 80px;
  width: 100%;
  height: fit-content;
`;

const Main = forwardRef((props, ref) => (
  <Middle>
    <Masthead />
    <TeamSection ref={ref} />
  </Middle>
));

export default Main;
