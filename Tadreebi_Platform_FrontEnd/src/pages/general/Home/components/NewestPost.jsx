import React from "react";
import "./NewestPost.scss";
import { List } from "antd";
import PostCard from "../../../../components/ui/PostCard/PostCard.jsx";
import { Link } from "react-router-dom";

const NewestPost = ({posts}) => {

  return (
    <div style={{ margin: "40px 0" }} className="newest-posts">
      <div className="title">احدث فرص التدريب</div>

      <div className="NewestPostMain">
        <List
          className="NewsetPostContainer"
          grid={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
          dataSource={posts.filter((element, index) => {
            return index < 3;
          })}
          renderItem={(item) => (
            <List.Item style={{ padding: "30px" }}>
              <PostCard data={item} />
            </List.Item>
          )}
        />
        <div>
          <Link to="/training-opportunities" className="ReadMore">
            عرض المزيد
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewestPost;
