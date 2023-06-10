import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Image, Space } from "antd";
import "./NewsDetails.scss";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import ReactQuill from "react-quill";

const NewsDetails = () => {
  const newsData = useLoaderData();


  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={newsData?.news} errorElement={<p>Error</p>}>
        {(loadedNews) => (
          <div className="new-details">
            <div className="container">
              <Image
                src={loadedNews?.logo?.logo_url}
                shape="circle"
                preview={false}
                className="institution-img"
              />
              <Space size={5} direction="vertical" className="space">
                <h1>{loadedNews?.title}</h1>
              </Space>
            </div>
            <ReactQuill
              value={loadedNews?.content}
              readOnly={true}
              theme={"bubble"}
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default NewsDetails;
