import { Button, Image, Space } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import linkedin from "../../../assets/images/image14.png";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import "./TrainingOpportunity.scss";
import { GetNewsId } from '../../../data/API';

const TrainingOpportunity = () => {

  const {id} = useParams();
  const {data,error ,loading} = GetNewsId(`http://localhost:8000/posts/${id}`);


  return (
    <div className="training-opportunity">
      <h1>{data.title}</h1>
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
      <p>{data.description}</p>
      <PostDetailsTable data={data} />
      <Button type="primary">تقديم</Button>
    </div>
  );
};

export default TrainingOpportunity;
