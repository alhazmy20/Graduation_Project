import React, { Suspense, useState } from "react";
import "../Home/Home.scss";
import StartUp from "./components/StartUp";
import About from "./components/About";
import NewestPost from "./components/NewestPost";
import PlatformWrok from "./components/PlatformWrok";
import { Await,  useLoaderData } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner/Spinner';
// import NewestPost from "./components/NewestPost";
const Home = () => {
  const [postsData, setPostsData] = useState(useLoaderData());

  return (
    <div className="home">
      <StartUp />
      <About />
      <Suspense fallback={<Spinner />}>
            <Await
              resolve={postsData?.posts}
              errorElement={<p>Error loading blog posts.</p>}
            >
              {(loadedPosts) => <NewestPost posts={loadedPosts} />}
            </Await>
          </Suspense>
      <PlatformWrok />
    </div>
  );
};

export default Home;