import React from 'react';
import styled from 'styled-components';


function RecommendResults({ filterData, selectedItem,setSelectedItem,setIsItemSelected,setWordEntered }) {
  
    return (
      <DataResult>
        {filterData.slice(0, 15).map((searchTerms, index) => {
          
          return (
            <a
              key={index}
              className={`dataItem ${searchTerms === selectedItem ? 'active' : ''}`}
              onClick={() => {
                setSelectedItem(searchTerms);
                setIsItemSelected(true);
                setWordEntered(searchTerms);
              }}
             
              target="_blank"
            >
              <p>{searchTerms}</p>
            </a>
          );
        })}
      </DataResult>
    );
  }

export default RecommendResults;

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