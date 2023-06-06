import React from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm.jsx';
import RecommendResults from './RecommendResults.jsx';
import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;

  
 
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
        setIsItemSelected(false);

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
            setIsItemSelected(true);
            navigate(`/search`, {
              state: {
                wordResult: wordEntered,
              },
            });

        }
    },[submitted,searchHistory,wordEntered]);

    return (
        <Container>
        <SearchForm handleSubmit={handleSubmit} handleFilter={handleFilter} wordEntered={wordEntered}/>

        {!isItemSelected && filterData.length !== 0 && (
          <RecommendResults filterData={filterData} selectedItem={selectedItem} setSelectedItem={setSelectedItem}
          setIsItemSelected={setIsItemSelected} setWordEntered={setWordEntered}/>
        )}

        </Container>
    );
};

export default SearchingBar;