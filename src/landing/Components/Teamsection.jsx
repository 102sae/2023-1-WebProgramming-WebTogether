import React, { forwardRef } from "react";
import styled from "styled-components";
import Member from "./Member";
import Taeyeon from "../../assets/김태연.jpg";
import Junghye from "../../assets/김정혜.jpg";

const Team = styled.section`
  height: 660px;
  margin-top: -16px;
  padding-top: 100px;
  font-size: 80px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const TeamSection = forwardRef((props, ref) => (
  <Team ref={ref}>
    <Member
      name="김정혜"
      birth="2001.09.12"
      major="정보통신공학과"
      num="2020112092"
      github="https://github.com/junghye01"
      keyword1="ISTP"
      keyword2="공대생"
      keyword3="집순이"
      img={Junghye}
    />

    <Member
      name="김태연"
      birth="2001.03.19"
      major="정보통신공학과"
      num="2020112107"
      github="https://github.com/taeyeon0319"
      keyword1="INFJ"
      keyword2="개발자"
      keyword3="보라색"
      img={Taeyeon}
    />

    <Member
      name="안정민"
      birth="2001.01.18"
      major="정보통신공학과"
      num="2020112095"
      github="https://github.com/102sae"
      keyword1="ISTJ"
      keyword2="고양이"
      keyword3="야구"
      img="https://avatars.githubusercontent.com/u/95170874?v=4"
    />
  </Team>
));

export default TeamSection;
