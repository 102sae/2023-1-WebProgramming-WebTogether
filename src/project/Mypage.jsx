import Navbar from "./Components/Navbar";
import Footer from "../landing/Components/Footer";
import MypageMain from "./Components/MypageMain";
import {useEffect,useState} from 'react';

function Mypage() {
  
  const [scrappedArticles,setScrappedArticles]=useState({});
 
  useEffect(()=>{
    setScrappedArticles(JSON.parse(localStorage.getItem('scrapped')) || {});
  },[]);
  return (
    <>
      <Navbar />
      <MypageMain       
        scrappedData={scrappedArticles}
      />
      <Footer />
    </>
  );
}

export default Mypage;
