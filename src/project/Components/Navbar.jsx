import React from "react";
import styled from "styled-components";
import logoImg from "../../assets/logo.jpg";

const NavHeader = styled.div`
  width: 100%;
  height: 80px;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
`;

const LogoLink = styled.img`
  width: 110px;
  display: flex;
  margin-left: 100px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const NavUser = styled.a`
  margin-left: auto;
  margin-right: 100px;
  width: 100px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  font-size: 20px;
  color: #ffffff80;
`;

function Navbar() {
  return (
    <NavHeader>
      <a href="/main">
        <LogoLink src={logoImg} alt="WEB-TOGETHER" />
      </a>
      <NavUser href="/mypage">MYPAGE</NavUser>
    </NavHeader>
  );
}

export default Navbar;
