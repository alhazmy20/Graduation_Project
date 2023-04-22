import { Button, Image, Space, notification } from "antd";
import React, { useState } from "react";
import { Link, useLoaderData, useRouteError } from "react-router-dom";
import sdaia from "../../../assets/images/image14.png";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import "./TrainingOpportunity.scss";
import { getPost } from "../../../util/api";

const TrainingOpportunity = () => {
  const error = useRouteError();
  const postData = useLoaderData();
  const {
    data: { data: post },
  } = postData;

  console.log(post);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to apply to training opportunity.");
      }
      setIsSubmitting(false);
      notification.success({ message: "تم التقديم بنجاح." });
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionError(error.message);
      notification.error({ message: "حدث خطأ أثناء تقديم الطلب." });
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="training-opportunity">
      <div className="container">
        <Image
          src={
            "http://s3.eu-central-1.amazonaws.com/graduation-project-test1/students/personal_pictures/0cPAv3DmiR6OJoWWBWod0ef3V5PssfWVAness7k6.png"
          }
          shape="circle"
          preview={false}
          className="institution-img"
        />
        <Space size={5} direction="vertical" className="space">
          <h1>{post.title}</h1>
          <span>سدايا</span>
        </Space>
      </div>
      <p>{post.content}</p>
      <PostDetailsTable data={post} />
      <Button
        type="primary"
        className="form-btn"
        onClick={handleSubmit}
        loading={isSubmitting}
      >
        تقديم
      </Button>
    </div>
  );
};
export default TrainingOpportunity;

export const opportunityLoader = ({ params }) => {
  const postId = params.id;
  return getPost(postId);
};
