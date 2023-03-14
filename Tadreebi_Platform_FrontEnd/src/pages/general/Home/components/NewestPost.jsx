import React from "react";
import PostCard from "../../../../components/ui/PostCard/PostCard";
import "./NewestPost.scss";
const NewestPost = () => {
  return (
    <div className="NewestPostMain">
      <div className="title">احدث فرص التدريب</div>
      <div>
     
        <PostCard />
      </div>
    </div>
  );
};

export default NewestPost;
