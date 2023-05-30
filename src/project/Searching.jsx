import React from "react";
import Navbar from "./Components/Navbar";
import SearchingBar from "./Components/SearchingBar";
import SearchingMain from "./Components/SearchingMain";
import Footer from "../landing/Components/Footer";

function ProjectMain() {
  return (
    <>
      <Navbar />
        <SearchingBar />
        <SearchingMain />
      <Footer />
    </>
  );
}

export default ProjectMain;