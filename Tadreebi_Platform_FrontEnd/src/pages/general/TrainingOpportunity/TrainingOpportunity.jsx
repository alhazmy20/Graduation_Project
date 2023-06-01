import { Button, Image, Space, notification } from "antd";
import React, { Suspense, useState } from "react";
import {
  Await,
  Link,
  useLoaderData,
  useParams,
  useRouteError,
} from "react-router-dom";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import "./TrainingOpportunity.scss";
import axiosConfig from "../../../util/axiosConfig";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useAuth } from "../../../auth/useContext";
import { displayMessage } from "../../../util/helpers";
import ReactQuill from "react-quill";

const TrainingOpportunity = ({ withApply }) => {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const error = useRouteError();
  const postData = useLoaderData();
  const auth = useAuth();
  const role = auth.user?.role;

  const id = useParams();

  const handleSubmit = async () => {
    if (!auth.user) {
      return displayMessage("warning", "يجب تسجيل الدخول");
    }

    const { id: post_id } = id;
    console.log(post_id);
    try {
      setLoading(true);
      await axiosConfig().post(`/api/applications?post_id=${post_id}`);
      setLoading(false);
      setDisable(true);
      notification.success({ message: "تم التقديم بنجاح." });
    } catch (error) {
      console.log(error);
      setLoading(false);
      displayMessage("warning", error.response.data.message);
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
                <Link to={`/institutions/${loadedData.institution.institutionId}`}>
                  <span className="institution-name">
                    {loadedData.institution.institutionName}
                  </span>
                </Link>
              </Space>
            </div>
            <ReactQuill
              value={loadedData?.content}
              readOnly={true}
              theme={"bubble"}
            />
            <PostDetailsTable data={loadedData} />
            {withApply && (role === "Student" || !role) && (
              <Button
                type="primary"
                className="form-btn"
                onClick={handleSubmit}
                loading={loading}
                disabled={disable}
              >
                تقديم
              </Button>
            )}
          </div>
        )}
      </Await>
    </Suspense>
  );
};
export default TrainingOpportunity;
