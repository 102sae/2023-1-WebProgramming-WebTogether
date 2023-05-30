import React from 'react';
import styled from 'styled-components';

const SearchingContainer = styled.div`
margin-left:210px;
margin-top:14px;
`;

const Bar = styled.input`
width: 600px;
height: 50px;
border: 1px solid #bbb;
border-radius: 8px;
padding-left: 10px;
font-size: 22px;
font-weight: bolder;
position: relative;
margin-left: 10px;
`;

const SearchingIcon = styled.img`
position: absolute;
width: 25px;
left: 790px;
top: 28px;
`;

const SearchingBar = () => {
    return (
        <form id="search-form" action="/search" method="GET">
            <SearchingContainer>
                <Bar
                    name="q"
                    type="text"
                    placeholder="뉴스 키워드 검색"
                />
                <a href="/search">
                    <SearchingIcon
                        src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
                    />
                </a>
            </SearchingContainer>
        </form>
    );
};

export default SearchingBar;