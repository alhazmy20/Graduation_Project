import React from "react";
import "../Home/Home.scss";
import StartUp from "./StartUp"
import About from "./About";
const Home = () => {
  return (
    <div className="home">
      <StartUp></StartUp>
      <About></About>
    </div>
  );
};

export default Home;
