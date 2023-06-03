import React, { useRef } from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Footer from "./Components/Footer";

function LandingMain() {
  const inputForm = useRef();

  const onMoveToForm = () => {
    inputForm.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar Member={onMoveToForm} />
      <Main ref={inputForm} />
      <Footer />
    </>
  );
}

export default LandingMain;
