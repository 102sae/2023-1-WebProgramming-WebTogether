import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ErrorRoot = styled.div`
  width: 800px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  z-index: 2;
`;
const Error404 = styled.div`
  position: absolute;
  top: 33%;
  font-size: 200px;
  font-family: "Archivo Black", sans-serif;
  font-family: "DynaPuff", cursive;
  font-family: "Passion One", cursive;
  font-family: "Rubik", sans-serif;
  color: rgba(256, 256, 256, 0.2);
`;

const ErrorHeader = styled.div`
  font-size: 36px;
  text-transform: uppercase;
  font-family: "Archivo Black", sans-serif;
  font-family: "DynaPuff", cursive;
  font-family: "Passion One", cursive;
  font-family: "Rubik", sans-serif;
  padding: 5px 0px;
  z-index: 1;
`;

const ErrorSpan = styled.div`
  font-size: 18px;
  font-family: "Archivo Black", sans-serif;
  font-family: "DynaPuff", cursive;
  font-family: "Passion One", cursive;
  font-family: "Rubik", sans-serif;
  padding: 5px 0px 10px 0px;
`;

const HomeBtn = styled.button`
  width: 130px;
  border-radius: 20px;
  padding: 5px 5px;

  font-family: "Archivo Black", sans-serif;
  font-family: "DynaPuff", cursive;
  font-family: "Passion One", cursive;
  font-family: "Rubik", sans-serif;
`;

const NavStyle = styled(NavLink)`
  color: black;
  outline: invert;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:active {
    color: black;
    position: relative;
    top: 2px;
  }
`;

export const NotFound = () => {
  return (
    <Root>
      <Error404>404</Error404>
      <ErrorRoot>
        <ErrorHeader>We are sorry, page not found!</ErrorHeader>
        <ErrorSpan>
          The page you are looking for might have been removed had its name
          changed or is temporarity unavailable.
        </ErrorSpan>
        <HomeBtn>
          <NavStyle to="/main">Back to Homepage</NavStyle>
        </HomeBtn>
      </ErrorRoot>
    </Root>
  );
};
export default NotFound;
