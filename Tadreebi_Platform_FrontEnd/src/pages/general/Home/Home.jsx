import React, { Suspense, useEffect } from "react";
import "../Home/Home.scss";
import StartUp from "./components/StartUp";
import About from "./components/About";
import NewestPost from "./components/NewestPost";
import PlatformWrok from "./components/PlatformWrok";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useAuth } from "../../../auth/useContext";
// import NewestPost from "./components/NewestPost";
const Home = () => {
  const postsData = useLoaderData();
  const navigate = useNavigate();

  const auth = useAuth();
  const role = auth.user?.role;

  useEffect(() => {
    if (auth.user) {
      switch (role) {
        case "Admin":
          navigate("/admin");
          break;
        case "SuperAdmin":
          navigate("/admin");
          break;
        case "Supervisor":
          navigate("/supervisor");
          break;
        default:
          navigate("/");
      }
    }
  }, [role, navigate, auth.user]);

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={postsData?.posts}
        errorElement={<p>Error loading blog posts.</p>}
      >
        {(loadedPosts) => (
          <div className="home">
            <StartUp />
            <About />
            <NewestPost posts={loadedPosts} />
            <PlatformWrok />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default Home;
