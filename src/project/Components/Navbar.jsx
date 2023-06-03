import React from "react";
import styled from "styled-components";
import logoImg from '../../assets/logo.jpg';

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

const NavbarWrapper = styled.div`
  width: 800px;
  margin-left: auto;
  margin-right: 100px;
  display: flex;
  justify-content: end;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
`;

const NavItem = styled.a`
  font-size: 20px;
  color: #ffffff80;
  margin-left: 60px;
  text-decoration: none;
`;

function Navbar() {
  return (
    <NavHeader>
      <a href="/" ><LogoLink src={ logoImg } alt="WEB-TOGETHER"/></a>
      <NavbarWrapper>
        <NavList>
          <li>
            <NavItem href="/main" className="nav-item2">
              HOME
            </NavItem>
          </li>
          <li>
            <NavItem href="/mypage" className="nav-item2">
              MYPAGE
            </NavItem>
          </li>
        </NavList>
      </NavbarWrapper>
    </NavHeader>
  );
}

export default Navbar;
