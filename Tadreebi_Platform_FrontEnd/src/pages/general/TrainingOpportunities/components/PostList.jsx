import React, { useState } from "react";
import { List } from "antd";
import { itemRender } from "../../../../components/ui/Pagination.js";
import PostCard from "../../../../components/ui/PostCard/PostCard.jsx";
import NoData from "../../../../components/ui/NoData/NoData.jsx";

const PostList = ({ posts }) => {
  const [page, setPage] = useState(1);

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
          setPage(page);
        },
        responsive: true,
        position: "bottom",
        align: "center",
        pageSize: 8,
        itemRender: itemRender,
      }}
      locale={{ emptyText: <NoData text={"لا توجد فرص تدريب حاليا"} /> }}
      dataSource={posts}
      renderItem={(item) => (
        <List.Item>
          <PostCard data={item} />
        </List.Item>
      )}
    />
  );
};

export default PostList;
