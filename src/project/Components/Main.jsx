import React from 'react';
import styled from 'styled-components';
import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";





function Main() {

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemIndex,setSelectedItemIndex]=useState(-1);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const selectedItemRef=useRef(null);
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
  

  const handleKeyArrow= (e)=>{
    if(filterData.length>0){
      if(e.key==='ArrowUp'){
        e.preventDefault();
        setSelectedItemIndex((prevIndex)=>Math.max(prevIndex-1,0));
      }
      else if(e.key==="ArrowDown"){
        e.preventDefault();
        setSelectedItemIndex((prevIndex)=>Math.min(prevIndex+1,filterData.length-1));
      }

    }
  }
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedItemIndex]);



  return (
    <MainContainer>
      <LogoName>WEB-TOGETHER</LogoName>
      
      <form id="search-form" className="form" onSubmit={handleSubmit}>
      <SearchingContainer>
          <SearchingBar
            
            type="text"
            placeholder="뉴스 키워드 검색"
            onChange={handleFilter}
            value={wordEntered}
          />

       
          <SearchingIcon type="submit" value="" form='search-form'/>
          
          </SearchingContainer>
      </form>
      

      {!isItemSelected && filterData.length !== 0 && (
          <DataResult>
            {filterData.slice(0, 15).map((searchTerms, index) => {
              const isSelected=index === selectedItemIndex;
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
                  onKeyDown={handleKeyArrow}
                  
                  ref={isSelected ? selectedItemRef:null}
                  
                  target="_blank"
                >
                  <p>{searchTerms}</p>
                </a>
              );
            })}
          </DataResult>
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

const DataResult = styled.div`
  width: 800px;
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
