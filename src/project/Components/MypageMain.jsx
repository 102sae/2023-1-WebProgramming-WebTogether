import React from "react";
import styled from "styled-components";
import SearchingMain from "./SearchingMain";

const Mypage = styled.div`
margin-top:100px;
  height:645px;
`;

const Title = styled.h1`
width:100px;
  margin:10px auto;
  color:white;
`;

function MypageMain() {
    return(
        <Mypage>
            <Title>MYPAGE</Title>
            <SearchingMain />
        </Mypage>
    );
}

export default MypageMain;