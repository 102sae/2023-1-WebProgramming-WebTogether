import React from "react";
import styled from "styled-components";
import SearchForm from "./SearchForm.jsx";
import RecommendResults from "./RecommendResults.jsx";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const initialState = {
  searchHistory: [],
  filterData: [],
  wordEntered: "",
  submitted: false,
  isItemSelected: false,
  selectedItem: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_HISTORY":
      return {
        ...state,
        searchHistory: action.payload,
      };
    case "SET_FILTER_DATA":
      return {
        ...state,
        filterData: action.payload,
      };
    case "SET_WORD_ENTERED":
      return {
        ...state,
        wordEntered: action.payload,
      };
    case "SET_SUBMITTED":
      return {
        ...state,
        submitted: action.payload,
      };
    case "SET_IS_ITEM_SELECTED":
      return {
        ...state,
        isItemSelected: action.payload,
      };
    case "SET_SELECTED_ITEM":
      return {
        ...state,
        selectedItem: action.payload,
      };
    default:
      return state;
  }
}

const SearchingBar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // 키보드 방향키 조작

  useEffect(() => {
    const savedData = localStorage.getItem("searchList");
    if (savedData) {
      dispatch({
        type: "SET_SEARCH_HISTORY",
        payload: JSON.parse(savedData).result,
      });
    }
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    dispatch({ type: "SET_WORD_ENTERED", payload: searchWord });
    dispatch({ type: "SET_IS_ITEM_SELECTED", payload: false });

    // 필터링 기능
    const newFilter = state.searchHistory.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      dispatch({ type: "SET_FILTER_DATA", payload: [] });
    } else {
      dispatch({ type: "SET_FILTER_DATA", payload: newFilter });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SUBMITTED", payload: true });
  };

  const move = () => {
    navigate(`/search`, {
      state: {
        wordResult: state.wordEntered,
      },
    });
  };

  useEffect(() => {
    if (state.submitted) {
      // 중복된 값은 로컬 스토리지에 포함시키지 않음

      const isWordEnteredExists = state.searchHistory.includes(
        state.wordEntered
      );
      if (!isWordEnteredExists) {
        const newData = [...state.searchHistory, state.wordEntered];
        dispatch({ type: "SET_SEARCH_HISTORY", payload: newData });
        localStorage.setItem("searchList", JSON.stringify({ result: newData }));
      }
      handleFilter({ target: { value: state.wordEntered } });
      dispatch({ type: "SET_SUBMITTED", payload: false });
      dispatch({ type: "SET_IS_ITEM_SELECTED", payload: true });
      move();
    }
  }, [state.submitted, state.searchHistory, state.wordEntered]);

  return (
    <Container>
      <SearchForm
        handleSubmit={handleSubmit}
        handleFilter={handleFilter}
        wordEntered={state.wordEntered}
      />

      {!state.isItemSelected && state.filterData.length !== 0 && (
        <RecommendResults
          filterData={state.filterData}
          selectedItem={state.selectedItem}
          setSelectedItem={(selectedItem) =>
            dispatch({ type: "SET_SELECTED_ITEM", payload: selectedItem })
          }
          setIsItemSelected={(isItemSelected) =>
            dispatch({ type: "SET_IS_ITEM_SELECTED", payload: isItemSelected })
          }
          setWordEntered={(wordEntered) =>
            dispatch({ type: "SET_WORD_ENTERED", payload: wordEntered })
          }
        />
      )}
    </Container>
  );
};

export default SearchingBar;
