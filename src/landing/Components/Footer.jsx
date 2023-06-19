import styled from "styled-components";

const FooterStyle = styled.div`
  width: 60%;
  height: 100px;
  margin: 0 auto;
  border-top: 1px solid #bbb;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const FooterContent = styled.p`
  color:#ffffff80;
`;

function Footer() {
  return (
    <FooterStyle>
      <FooterContent>
        <p style={{display:"flex", justifyContent:"center"}}>2023 웹프로그래밍 팀 프로젝트</p>
        <p style={{display:"flex", justifyContent:"center", marginTop:"-15px"}}>2020112092 김정혜 2020112107 김태연 2020112095 안정민</p>
        <p style={{display:"flex", justifyContent:"center", marginTop:"-15px"}}>Copyright 2023. WEB-TOGETHER all rights reserved.</p>
      </FooterContent>
    </FooterStyle>
  );
}

export default Footer;
