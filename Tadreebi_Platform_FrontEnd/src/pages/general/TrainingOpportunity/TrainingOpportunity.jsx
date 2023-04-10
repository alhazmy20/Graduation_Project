import { Button, Image, Space, notification } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import linkedin from "../../../assets/images/image14.png";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import "./TrainingOpportunity.scss";
import { GetNewsId, useFetch } from "../../../data/API";
import NotFound from "../NotFound/NotFound";
import Spinner from "../../../components/ui/Spinner/Spinner";

const TrainingOpportunity = () => {
  // const { id } = useParams();
  const { data, error, loading } = useFetch(`http://localhost:8000/post`);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const {data: {data: post}} = data;
  console.log(post);

  return (
    <div className="training-opportunity">
      <h1>{post.title}</h1>
      <Space wrap size={5}>
        <div>
          <Image
            src={linkedin}
            shape="circle"
            preview={false}
            style={{
              width: "100px",
              height: "50px",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
          <Link to="/">سدايا</Link>
        </div>
      </Space>
      <p>{post.description}</p>
      <PostDetailsTable data={post} />
      <Button type="primary">تقديم</Button>
    </div>
  );
};
export default TrainingOpportunity;
