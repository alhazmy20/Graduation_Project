import React, { Suspense, useState } from "react";
import "react-quill/dist/quill.snow.css";
import axiosConfig from "../../../util/axiosConfig";
import { Button, Col, Form, notification } from "antd";
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import "./AddNews.scss";
import InputFile from "../../../components/form/InputFile";
import FormInput from "../../../components/form/FormInput";
import NewsContentArea from "./components/NewsContentArea";

const AddNews = () => {
  const newsLoader = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [newsContent, setNewsContent] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleFormChange = (changedValues, allValues, name, value) => {
    setNewsContent((prevState) => ({
      ...prevState,
    }));
    setIsFormChanged(
      Object.keys(changedValues).some(
        (key) => allValues[key] !== newsLoader?.[key]
      )
    );
  };

  const onFinish = async (values) => {
    //api code
    const formData = new FormData();
    formData.append("newsLogo", values.newsLogo?.file);
    formData.append("title", values.title);
    formData.append("content", values.content);
    if (id) {
      formData.append("_method", "PUT");
    }

    const URL = id ? `api/news/${id}` : `api/news`;
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      setLoading(true);
      await axiosConfig().post(URL, formData, {
        headers,
      });
      notification.success({
        message: `تمت ${id ? "تحديث" : "اضافة"} الخبر  بنجاح`,
      });
      setLoading(false);
      navigate("/admin/manage-news");
    } catch (error) {
      console.log(error);
      notification.error({ message: "فشل تحديث البيانات" });
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={newsLoader?.news}
        errorElement={<p>Error loading add-news page.</p>}
      >
        {(loadedNews) => (
          <div className="addNewsContainer">
            <div className="addNewsTitle">
              <span>
                <strong>اضافة خبر</strong>
              </span>
            </div>

            <div className="addNewsFormContainer">
              <Form
                form={form}
                initialValues={loadedNews}
                onFinish={onFinish}
                onValuesChange={handleFormChange}
              >
                <Col>
                  <InputFile
                    fileName={loadedNews?.logo?.logo_filename}
                    name="newsLogo"
                    label="اضافة صورة"
                    accept="image/*"
                  />
                </Col>
                <Col>
                  <FormInput
                    label="عنوان الخبر"
                    placeholder="اضف عنوان الخبر"
                    name="title"
                  />
                </Col>
                <Col style={{ textAlign: "left" }}>
                  <NewsContentArea
                    name="content"
                    initialValue={loadedNews?.content}
                  />
                </Col>
                <div className="addNewsButton btnContainer">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="add-button greenBtn"
                    disabled={!isFormChanged}
                    loading={loading}
                  >
                    {loading ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default AddNews;
