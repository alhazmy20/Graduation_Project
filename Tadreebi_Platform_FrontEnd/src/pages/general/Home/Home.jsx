import React from "react";
import "../Home/Home.scss";
import StartUp from "./components/StartUp";
import About from "./components/About";
import Footer from "../../../layouts/Footer/Footer";
import NewestPost from "./components/NewestPost";
const Home = () => {
  return (
    <div className="home">
      <StartUp />
      <About />
      <NewestPost />
      <Footer />
    </div>
  );
};

export default Home;
