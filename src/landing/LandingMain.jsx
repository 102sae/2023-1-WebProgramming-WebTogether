import React, { useRef } from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Footer from "./Components/Footer";

function LandingMain() {
  const scrollToMember = useRef();

  const onMoveToMember = () => {
    scrollToMember.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar Member={onMoveToMember} />
      <Main ref={scrollToMember} />
      <Footer />
    </>
  );
}

export default LandingMain;
