import React from "react";
import "../Home/Home.scss";
import StartUp from "./components/StartUp";
import About from "./components/About";
import footer from "../../../layouts/Footer/Footer";
const Home = () => {
  return (
    <div className="home">
      <StartUp />
      <About />
      <footer />
    </div>
  );
};

export default Home;
