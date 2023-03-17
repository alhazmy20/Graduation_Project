import { Button, Image, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import linkedin from "../../../assets/images/image14.png";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import "./TrainingOpportunity.scss";
import { PostDetailsData } from "../../../data/TestData.js"; //NOTE This is for testing purposes only. You should remove it after you retrieve the data from the API.
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";

const TrainingOpportunity = () => {
  const { title, description, ...data } = PostDetailsData[0];
  return (
    <div className="training-opportunity">
      <h1>{title}</h1>
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
      <p>{description}</p>
      <PostDetailsTable data={data} />
      <Button type="primary">تقديم</Button>
    </div>
  );
};

export default TrainingOpportunity;
