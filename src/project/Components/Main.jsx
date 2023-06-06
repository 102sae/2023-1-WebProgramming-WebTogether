import React from 'react';
import styled from 'styled-components';
import RecommendResults from './RecommendResults.jsx';
import SearchForm from './SearchForm.jsx';
import { useEffect,useReducer } from "react";
import { useNavigate } from "react-router-dom";



const initialState={
  data:[],
  filterData:[],
  wordEntered:'',
  submitted:false,
  isItemSelected:false,
  selectedItem:'',
};


function reducer(state,action){
  switch(action.type){
    case 'SET_DATA':
      return{
        ...state, data:action.payload
      };
      case 'SET_FILTER_DATA':
        return{
          ...state,filterData:action.payload,
        };
      case 'SET_WORD_ENTERED':
        return{
          ...state,wordEntered:action.payload,
        };
      case 'SET_SUBMITTED':
        return{
          ...state,submitted:action.payload,
        };
      case 'SET_IS_ITEM_SELECTED':
        return{
          ...state,isItemSelected:action.payload,
        };
      case 'SET_SELECTED_ITEM':
        return{
          ...state,selectedItem:action.payload,
        };
      default:
        return state;


  }
}


function Main() {

  
  const [state,dispatch]=useReducer(reducer,initialState);
  const navigate = useNavigate();

  const move = () => {
    navigate(`/search`, {
      state: {
        result: state.wordEntered,
      },
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("searchList");
    if (savedData) {
      dispatch({type:'SET_DATA',payload:JSON.parse(savedData).result});
    }
  }, []);


  const handleFilter = (e) => {
    const searchWord = e.target.value;
    dispatch({type:'SET_WORD_ENTERED',payload:searchWord});
    dispatch({type:'SET_IS_ITEM_SELECTED',payload:false});
    

    const newFilter = state.data.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      dispatch({type:'SET_FILTER_DATA',payload:[]});
    } else {
      dispatch({type:'SET_FILTER_DATA',payload:newFilter});
      
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SUBMITTED', payload: true });
  };


  useEffect(() => {
    if (state.submitted) {

      const isWordEnteredExists = state.data.includes(state.wordEntered);

      if (!isWordEnteredExists) {
        const newData = [...state.data, state.wordEntered];
        dispatch({type:'SET_DATA',payload:newData});
        localStorage.setItem("searchList", JSON.stringify({ result: newData }));
      }

      handleFilter({ target: { value: state.wordEntered } });

      dispatch({type:'SET_SUBMITTED',payload:false});

      move();
    }
  }, [state.submitted, state.data, state.wordEntered]);







  return (
    <MainContainer>
      <LogoName>WEB-TOGETHER</LogoName>

      <SearchForm handleSubmit={handleSubmit} handleFilter={handleFilter} wordEntered={state.wordEntered} />


      {!state.isItemSelected && state.filterData.length!==0 && (
        <RecommendResults filterData={state.filterData} selectedItem={state.selectedItem} 
        setSelectedItem={(selectedItem)=>dispatch({type:'SET_SELECTED_ITEM',payload:selectedItem})} setIsItemSelected={(isItemSelected)=>dispatch({type:'SET_IS_ITEM_SELECTED',payload:isItemSelected})} 
          setWordEntered={(wordEntered)=>dispatch({type:'SET_WORD_ENTERED',payload: wordEntered})} />

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