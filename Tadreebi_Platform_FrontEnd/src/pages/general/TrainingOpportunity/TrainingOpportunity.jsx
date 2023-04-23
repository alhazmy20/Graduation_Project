import { Button, Image, Space, notification } from "antd";
import React, { Suspense, useState } from "react";
import {
  Await,
  defer,
  useLoaderData,
  useParams,
  useRouteError,
} from "react-router-dom";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import "./TrainingOpportunity.scss";
import { getPost } from "../../../util/api";
import api from "../../../data/axiosConfig";
import Spinner from "../../../components/ui/Spinner/Spinner";

const TrainingOpportunity = () => {
  const error = useRouteError();
  const postData = useLoaderData();

  const id = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = async () => {
    const {id: post_id} = id;
    console.log(post_id);
    setIsSubmitting(true);
    try {
      await api().post(`/api/applications?post_id=${post_id}`);
      setIsSubmitting(false);
      notification.success({ message: "تم التقديم بنجاح." });
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setSubmissionError(error.message);
      notification.error({ message: "حدث خطأ أثناء تقديم الطلب." });
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={postData?.post}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="training-opportunity">
            <div className="container">
              <Image
                src={
                  loadedData.institution.logo_url ||
                  "http://s3.eu-central-1.amazonaws.com/graduation-project-test1/students/personal_pictures/0cPAv3DmiR6OJoWWBWod0ef3V5PssfWVAness7k6.png"
                }
                shape="circle"
                preview={false}
                className="institution-img"
                loading="lazy"
              />
              <Space size={5} direction="vertical" className="space">
                <h1>{loadedData.title}</h1>
                <span>سدايا</span>
              </Space>
            </div>
            <p>{loadedData.content}</p>
            <PostDetailsTable data={loadedData} />
            <Button
              type="primary"
              className="form-btn"
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              تقديم
            </Button>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
export default TrainingOpportunity;

export const opportunityLoader = ({ params }) => {
  const postId = params.id;
  return defer({ post: getPost(postId) });
};
