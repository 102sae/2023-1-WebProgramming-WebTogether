import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "../landing/Components/Footer";
import MypageMain from "./Components/MypageMain";

function Mypage() {
  return (
    <>
      <Navbar />
        <MypageMain />
      <Footer />
    </>
  );
}

export default Mypage;