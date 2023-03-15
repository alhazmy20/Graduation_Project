import React from "react";
import "./NewestPost.scss";
import { List } from "antd";
import { itemRender } from "../../../../components/ui/Pagination.js";
import PostCard from "../../../../components/ui/PostCard/PostCard.jsx";
import { data } from "../../../../data/TestData.js";

const NewestPost = () => {
  return (
    <div style={{ margin: "40px 0" }}>
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
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            responsive: true,
            position: "bottom",
            itemRender: itemRender,
            align: "center",
            pageSize: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item style={{ padding: "30px" }}>
              <PostCard item={item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default NewestPost;
