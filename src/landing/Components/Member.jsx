import React from "react";
import styled from "styled-components";

const MemberStyle = styled.div`
  width: 25%;
  height: 600px;
  background-color: black;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 15px;
`;

const MemberImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
`;

const MemberInfo = styled.div`
  width: 80%;
  height: 280px;
  color: white;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  line-height: 0px;
  /* background-color: red; */
`;

const MemberName = styled.p`
  font-weight: bolder;
  font-size: 30px;
  color: white;
  margin-top: 0px;
`;

const Birth = styled.span`
  color: #ffffff80;
  font-size: 15px;
  margin-left: 10px;
`;

const NameUnderLine = styled.hr`
  width: 200px;
  /* border: none; */
  border-top: 1px solid #ccc;
  margin-top: -60px;
`;

const Major = styled.p`
  margin-top: -40px;
`;

const Github = styled.a`
  text-decoration: none;
  color: #ffffff80;
`;

const Keyword = styled.div`
  width: 90%;
  height: 50px;
  margin-top: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Key = styled.p`
  width: 85px;
  height: 40px;
  border-radius: 15px;
  background-color: #333333;
  color: white;
  font-size: 16px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Member(props) {
  return (
    <>
      <MemberStyle>
        <MemberImg src={props.img} alt="" />
        <MemberInfo>
          <MemberName>
            {props.name}
            <Birth>{props.birth}</Birth>
          </MemberName>
          <NameUnderLine />
          <Major>
          {props.major}
            <span style={{ fontStyle: "italic" }}> {props.num}</span>
          </Major>
          <Github href={props.github} target="_blank">
            {props.github}
          </Github>
          <Keyword>
            <Key>{props.keyword1}</Key>
            <Key>{props.keyword2}</Key>
            <Key>{props.keyword3}</Key>
          </Keyword>
        </MemberInfo>
      </MemberStyle>
    </>
  );
}

export default Member;
