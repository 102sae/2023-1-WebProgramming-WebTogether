import Navbar from "./Components/Navbar";
import Footer from "../landing/Components/Footer";
import MypageMain from "./Components/MypageMain";
import {useEffect,useState} from 'react';

function Mypage() {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  const [scrappedArticles,setScrappedArticles]=useState({});
  //const closeModal = () => setIsModalOpen(false);
 

  //const openModal = (key) => {
    
    //setIsModalOpen(true);
  //};

  

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
