import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 250px;
  margin-bottom: 300px;
`;

const LogoName = styled.h1`
  text-align: center;
  margin-top: 150px;
  margin-bottom: 20px;
  font-size: 90px;
  color: white;
`;

const SearchingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SearchingBar = styled.input`
  width: 800px;
  height: 60px;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding-left: 10px;
  font-size: 25px;
  font-weight: bolder;
  position: relative;
`;

const SearchingIcon = styled.img`
  position: absolute;
  width: 25px;
  top: 405px;
  right: 380px;
  margin: 0;
`;

function Main() {
  return (
    <MainContainer>
      <LogoName>WEB-TOGETHER</LogoName>
      <form id="search-form" action="/search" method="GET">
        <SearchingContainer>
          <SearchingBar name="q" type="text" placeholder="뉴스 키워드 검색" />
          <a href="/search">
            <SearchingIcon src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
          </a>
        </SearchingContainer>
      </form>
    </MainContainer>
  );
}

export default Main;
