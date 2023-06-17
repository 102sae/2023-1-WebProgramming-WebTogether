import React from 'react';
import styled from 'styled-components';

function SearchForm({ handleSubmit, handleFilter, wordEntered, searchTerm }) {
    return (
      <form id="search-form" className="form" onSubmit={handleSubmit}>
        <SearchingContainer>
          <SearchingBar
            type="text"
            placeholder={searchTerm ? searchTerm : "뉴스 키워드 입력"}
            onChange={handleFilter}
            value={wordEntered}
          />
          <SearchingIcon type="submit" value="" form="search-form" />
        </SearchingContainer>
      </form>
    );
  }

export default SearchForm;

const SearchingContainer = styled.div`
  position:relative;
  display: flex;
  justify-content: center;
  margin-top:20px;

`;

const SearchingBar = styled.input`
  width: 800px;
  height: 60px;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding-left: 10px;
  font-size: 25px;
  font-weight: bolder;
  
`;

const SearchingIcon = styled.input`
  position: absolute;
  width: 60px;
  height:60px;
  top: 50%;
  right: 10px;
  transform: translateY(-50%); 
  margin: 0;
  background : url("https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png") no-repeat;
  background-position:center;
  background-size:35px;
  border:none;
  cursor:pointer;
`;