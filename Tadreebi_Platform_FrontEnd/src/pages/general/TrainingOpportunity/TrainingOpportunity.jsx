import { Button, Image, Space, notification } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import sdaia from "../../../assets/images/image14.png";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import "./TrainingOpportunity.scss";
import {  useFetch } from "../../../data/API";
import Spinner from "../../../components/ui/Spinner/Spinner";

const TrainingOpportunity = () => {
  const { data, error, loading } = useFetch(`http://localhost:8000/post`);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId: data.id })
      });
      if (!response.ok) {
        throw new Error('Failed to apply to training opportunity.');
      }
      setIsSubmitting(false);
      notification.success({ message: 'تم التقديم بنجاح.' });
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionError(error.message);
      notification.error({ message: 'حدث خطأ أثناء تقديم الطلب.' });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const { data: post } = data;

  return (
    <div className="training-opportunity">
      <h1>{post.title}</h1>
      <Space wrap size={5}>
        <div>
          <Image
            src={sdaia}
            shape="circle"
            preview={false}
            className='institution-img'
          />
          <Link to="/">سدايا</Link>
        </div>
      </Space>
      <p>{post.content}</p>
      <PostDetailsTable data={post} />
      <Button type="primary" className='form-btn' onClick={handleSubmit} loading={isSubmitting}>تقديم</Button>
      {submissionError && <div>{submissionError}</div>}
    </div>
  );
};
export default TrainingOpportunity;
