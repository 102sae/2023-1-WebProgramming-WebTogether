import React from 'react';
import styled from 'styled-components';
import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;

  
 
`;

const SearchingContainer = styled.div`

position:relative;
display: flex;

margin-top:20px;
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

const SearchingIcon = styled.input`
position: absolute;
width: 35px;
height:35px;
left: 580px;
top: 10px;
background : url("https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png") no-repeat;
background-position:center;
background-size:35px;
border:none;
cursor:pointer;
 
`;

const DataResult = styled.div`
  width: 600px;
  height: 200px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
  
  margin-top: 5px;
  border-radius: 5px;
  justify-content:center;
  
  

  .dataItem {
    padding: 0 10px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .dataItem:hover {
    background-color: gray;
    color: #fff;
  }
`;

const SearchingBar = () => {

    const [searchHistory,setsearchHistory]=useState([]);
    const [wordEntered,setWordEntered]=useState("");
    const [submitted,setSubmitted]=useState(false);
    const navigate = useNavigate();
    // 필터링
    const [filterData,setFilterData]=useState([]);
    const [selectedItem,setSelectedItem]=useState("");
    const [isItemSelected,setIsItemSelected]=useState(false);
    
    // 키보드 방향키 조작

    useEffect(()=>{
        const savedData=localStorage.getItem('searchList');
        if(savedData){
            setsearchHistory(JSON.parse(savedData).result);
        }
    },[]);

    const handleFilter=(e)=>{
        const searchWord=e.target.value;
        setWordEntered(searchWord);

        // 필터링 기능
        const newFilter=searchHistory.filter((value)=>{
            return value.toLowerCase().includes(searchWord.toLowerCase());
        })

        if (searchWord=== ""){
            setFilterData([]);
        }
        else{
            setFilterData(newFilter);
        }
    }

    const handleSubmit=  (e)=>{
        e.preventDefault();
        setSubmitted(true);
    }

    useEffect(()=>{
        if(submitted){
            // 중복된 값은 로컬 스토리지에 포함시키지 않음

            const isWordEnteredExists=searchHistory.includes(wordEntered);
            if(!isWordEnteredExists){
                const newData=[...searchHistory,wordEntered];
                setsearchHistory(newData);
                localStorage.setItem("searchList", JSON.stringify({ result: newData }));

            }
            handleFilter({ target: { value: wordEntered } });
            setSubmitted(false);
            navigate(`/search`, {
              state: {
                wordResult: wordEntered,
              },
            });

        }
    },[submitted,searchHistory,wordEntered]);

    return (
        <Container>
        <form id="search-form" onSubmit={handleSubmit}>
            <SearchingContainer>
                <Bar
                   
                    type="text"
                    onChange={handleFilter}
                    placeholder="뉴스 키워드 검색"
                    value={wordEntered}
                />
               
                <SearchingIcon type="submit" value="" form ='search-form'/>
                        
                    
              
            </SearchingContainer>
        </form>

        {!isItemSelected && filterData.length !== 0 && (
          <DataResult>
            {filterData.slice(0, 15).map((searchTerms, index) => {
             
              return (
                <a
                  key={index}
                  className={`dataItem ${
                    searchTerms === selectedItem ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedItem(searchTerms);
                    setWordEntered(searchTerms);
                    setIsItemSelected(true);
                  }}
                
                  
                 
                  target="_blank"
                >
                  <p>{searchTerms}</p>
                </a>
              );
            })}
          </DataResult>
        )}

        </Container>
    );
};

export default SearchingBar;