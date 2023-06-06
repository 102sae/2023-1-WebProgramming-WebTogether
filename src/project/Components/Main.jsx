import React from 'react';
import styled from 'styled-components';
import RecommendResults from './RecommendResults.jsx';
import SearchForm from './SearchForm.jsx';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";






function Main() {

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [selectedItem,setSelectedItem]=useState("");


  const navigate = useNavigate();

  const move = () => {
    navigate(`/search`, {
      state: {
        result: wordEntered,
      },
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("searchList");
    if (savedData) {
      setData(JSON.parse(savedData).result);
    }
  }, []);


  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    setIsItemSelected(false);

    const newFilter = data.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };


  useEffect(() => {
    if (submitted) {

      const isWordEnteredExists = data.includes(wordEntered);

      if (!isWordEnteredExists) {
        const newData = [...data, wordEntered];
        setData(newData);
        localStorage.setItem("searchList", JSON.stringify({ result: newData }));
      }

      handleFilter({ target: { value: wordEntered } });

      setSubmitted(false);

      move();
    }
  }, [submitted, data, wordEntered]);







  return (
    <MainContainer>
      <LogoName>WEB-TOGETHER</LogoName>

      <SearchForm handleSubmit={handleSubmit} handleFilter={handleFilter} wordEntered={wordEntered} />


      {!isItemSelected && filterData.length!==0 && (
        <RecommendResults filterData={filterData} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setIsItemSelected={setIsItemSelected} 
          setWordEntered={setWordEntered} />

      )}
      


    </MainContainer>
  );
};

export default Main;


const MainContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;

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

