import React, { useEffect, useState } from "react";
import { List, notification } from "antd";
import { itemRender } from "../../../../components/ui/Pagination.js";
import PostCard from "../../../../components/ui/PostCard/PostCard.jsx";
import Spinner from "../../../../components/ui/Spinner/Spinner.jsx";
import NoData from "../../../../components/ui/NoData/NoData.jsx";
import { useFetch } from "../../../../data/API.js";

const PostList = () => {
  const [page, setPage] = useState(1);
  // const { data, loading, error } = useFetch(`http://localhost:8000/api/posts?page=${page}`);
  const { data, loading, error } = useFetch(`http://localhost:8000/posts`);
  useEffect(()=>{console.log('Change');},[page])

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  // if (!data) {
  //   return <NoData text="لا توجد فرص تدريب حاليا" />;
  // }

  const {
    data: { data: posts },
  } = data;

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
