import React from "react";
import { useLoaderData, useRouteError } from "react-router-dom";
import { Image, Space } from "antd";
import "./NewsDetails.scss";
import { getNews } from "../../../../util/api";

const NewsDetails = () => {
  const error = useRouteError();
  const newsData = useLoaderData();
  console.log(newsData);

  const {
    data: { data: news },
  } = newsData;

  return (
    <div className="new-details">
      <div className="container">
        <Image
          src={news.logo?.logo_url}
          shape="circle"
          preview={false}
          className="institution-img"
        />
        <Space size={5} direction="vertical" className="space">
          <h1>{news?.title}</h1>
          <span>سدايا</span>
        </Space>
      </div>
      <p>{news?.title}</p>
    </div>
  );
};

export default NewsDetails;

export const newsDetailsloader = ({ params }) => {
  const postId = params.id;
  return getNews(postId);
};
