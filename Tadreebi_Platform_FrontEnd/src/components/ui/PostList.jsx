import React from "react";
import { List } from "antd";
import { itemRender } from "./Pagination.js";
import PostCard from "./PostCard/PostCard.jsx";

const PostList = (props) => {
  const { data } = props;

  return (
    <List
      className="post-list"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        responsive: true,
        position: "bottom",
        itemRender: itemRender,
        align: "center",
        pageSize: 8,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <PostCard item={item} />
        </List.Item>
      )}
    />
  );
};

export default PostList;
