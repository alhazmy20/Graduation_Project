import React from "react";
import "../Home/Home.scss";
import StartUp from "./components/StartUp";
import About from "./components/About";
import NewestPost from "./components/NewestPost";
import PlatformWrok from "./components/PlatformWrok";
// import NewestPost from "./components/NewestPost";
const Home = () => {
  return (
    <div className="home">
      <StartUp />
      <About />
      <NewestPost />
      <PlatformWrok />
    </div>
  );
};

export default Home;
