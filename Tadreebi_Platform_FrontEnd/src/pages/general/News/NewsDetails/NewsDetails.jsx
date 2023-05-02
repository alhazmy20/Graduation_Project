import React, { Suspense } from "react";
import { Await, useLoaderData, useRouteError } from "react-router-dom";
import { Image, Space } from "antd";
import "./NewsDetails.scss";
import { getNews } from "../../../../util/api";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import ReactQuill from "react-quill";

const NewsDetails = () => {
  const error = useRouteError();
  const newsData = useLoaderData();
  
  console.log(newsData)
  
  return (
    <Suspense fallback={<Spinner/>}>
      <Await
      resolve={newsData}
      errorElement={<p>Error</p>}
      >
      <div className="new-details">
      <div className="container">
        <Image
          src={newsData?.logo?.logo_url}
          shape="circle"
          preview={false}
          className="institution-img"
        />
        <Space size={5} direction="vertical" className="space">
          <h1>{newsData?.title}</h1>
        </Space>
      </div>
      <ReactQuill
      value={newsData?.content}
      readOnly={true}
      theme={"bubble"}
      />
    </div>
      </Await>
    </Suspense>
  );
};

export default NewsDetails;

export const newsDetailsloader = ({ params }) => {
  const postId = params.id;
  return getNews(postId);
};
