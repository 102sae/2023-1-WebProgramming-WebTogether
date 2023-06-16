import React from "react";
import Article from "./Article";
import Modal from './Modal';
import {useState,useEffect} from 'react';

function MypageMain({ scrappedData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent,setSelectedContent]=useState({});
  const [selectedContentKey,setSelectedContentKey]=useState('');
  const closeModal = () => setIsModalOpen(false);
  
  
  return (
    <div>
      {Object.keys(scrappedData).map((date) => (
        
        <div key={date}>
          
          <h1>날짜 : {date}</h1>
          {scrappedData[date].map((article, index) => (// article안에는 content, selectedKey(title)
            
            <Article
              key={`article_${index}`}
              title={article.selectedKey}
            
              date={article.content.date}
              onClick={() =>{
                setIsModalOpen(true);
                const contentDict={};
                contentDict[article.selectedKey]=article.content;
                setSelectedContent(contentDict); // 조회한 것 
                console.log('scrapped data키가 뭐냐아앙',Object.keys(scrappedData));
               // console.log('date',contentDict[article.selectedKey].date);
                setSelectedContentKey(article.selectedKey);
                //console.log('content',article.content.date);
                
              }} 
            />
          ))}
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={selectedContent}
        selectedKey={selectedContentKey}
        showScrapButton={false}
        
      />
    </div>
  );
}

export default MypageMain;
