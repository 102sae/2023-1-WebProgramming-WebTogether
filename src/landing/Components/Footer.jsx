import styled from "styled-components";

const FooterStyle = styled.div`
  width: 60%;
  height: 100px;
  margin: 0 auto;
  border-top: 1px solid #bbb;
`;

function Footer() {
  return (
    <FooterStyle>
      <p>footer부분</p>
    </FooterStyle>
  );
}

export default Footer;
