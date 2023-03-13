import React from "react";
import "../Home/Home.scss";
import StartUp from "./components/StartUp"
import About from "./components/About";
const Home = () => {
  return (
    <div className="home">
      <StartUp></StartUp>
      <About></About>
    </div>
  );
};

export default Home;
