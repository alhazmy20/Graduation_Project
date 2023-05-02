import React, { Suspense, useState } from "react";
import { Button, Input, Col, Row, Form, notification } from "antd";
import { RegionData } from "../../../data/TestData.js";

import ReactTextArea from "./components/ReactTextArea";
import "../instPostForm/InstPostForm.scss";
import ReactRadio from "./components/ReactRadio.jsx";
import MultiSelect from "./components/MultiSelect .jsx";
import CustomDatePicker from "./components/CustomDatePicker.jsx";
import SelectRegion from "./components/SelectRegion.jsx";
import SelectCity from "./components/SelectCity.jsx";
import api from "../../../data/axiosConfig";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { getPost } from "../../../util/api.js";
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";
import {
  useFormPostData,
  formatFormValues,
  radioOptionsType,
  radioOptionsReward,
  radioOptionsGender,
  options,
  formatDate,
} from "./FormPostAttachment.js";
import ReactInput from "./components/ReactInput.jsx";
import { data } from "../../../data/SaudiClassification.js";
const InstPostForm = () => {
  const opportunityData = useLoaderData();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [formPostData, setFormPostData] = useFormPostData();
  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFormChange = (changedValues, allValues) => {
    const formattedValues = formatFormValues(allValues);
    setFormPostData((prevState) => ({
      ...prevState,
      ...formattedValues,
    }));
  };

  const onFinish = async (value) => {
    //api code

    try {
      await api().post(`api/posts`, formPostData);
      notification.success({ message: "تمت إضافة الفرصة  بنجاح" });
      setLoading(false);
      navigate("/institution/posts");
      console.log(formPostData);
      console.log(formPostData);
    } catch (error) {
      console.log(error);
      notification.error({ message: "فشل تحديث البيانات" });
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={opportunityData?.post}
        errorElement={<p>Error loading blog posts.</p>}
      >
        {(loadedPost) => (
          <div className="institution-NewPostCont">
            <div className="pagePostTitle">
              <span className="TitleName"> إضافة فرصة تدريبية</span>
            </div>
            <div className="postfromConteiner">
              <Form
                onValuesChange={handleFormChange}
                onFinish={onFinish}
                className="form"
                form={form}
              >
                <Col>
                  <ReactInput name="title" initialValue={loadedPost?.title} />
                </Col>
                <Col style={{ textAlign: "left" }}>
                  <ReactTextArea
                    name="content"
                    initialValue={loadedPost?.content}
                  />
                </Col>
                <Row className="formInputContainer">
                  <Col className="InputsContainer">
                    <Row className="RowDivElment">
                      <label className="label">نوع البرنامج التدريبي: </label>
                      <ReactRadio
                        name="t_type"
                        options={radioOptionsType}
                        initValue={loadedPost?.t_type}
                      />
                    </Row>

                    <Row className="RowDivElment">
                      <label className="label">المنطقة: </label>
                      <SelectRegion
                        name="region"
                        options={RegionData}
                        initValue={loadedPost?.region}
                        valueChnage={handleRegionChange}
                      />
                    </Row>
                    <Row className="RowDivElment">
                      <label className="label">تاريخ البدء: </label>
                      <CustomDatePicker
                        name="t_startDate"
                        label="تاريخ بدء التدريب"
                        required={true}
                        initValue={loadedPost?.t_startDate}
                      />
                    </Row>
                    <Row className="RowDivElment">
                      <label className="label">تاريخ انتهاء الإعلان: </label>
                      <CustomDatePicker
                        name="p_endDate"
                        label="تاريخ انتهاء الإعلان"
                        required={true}
                        initValue={loadedPost?.p_endDate}
                      />
                    </Row>
                  </Col>

                  <Col className="InputsContainer">
                    <Row className="RowDivElment">
                      <label className="label">مكافأة: </label>
                      <ReactRadio
                        name="reward"
                        options={radioOptionsReward}
                        initValue={
                          loadedPost?.reward === "يوجد"
                            ? 1
                            : loadedPost?.reward === "لا يوجد"
                            ? 0
                            : undefined
                        }
                      />
                    </Row>

                    <Row className="RowDivElment">
                      <label className="label">المدينة: </label>
                      <SelectCity
                        data={RegionData}
                        formDate={selectedRegion}
                        initValue={loadedPost?.city}
                      />
                    </Row>

                    <Row className="RowDivElment">
                      <label className="label">تاريخ الإنتهاء: </label>
                      <CustomDatePicker
                        name="t_endDate"
                        label="تاريخ إنتهاء التدريب"
                        required={true}
                        initValue={loadedPost?.t_endDate}
                      />
                    </Row>

                    <Row className="RowDivElment">
                      <label className="label">الجنس: </label>
                      <ReactRadio
                        name="gender"
                        options={radioOptionsGender}
                        initValue={
                          loadedPost?.gender === "ذكر"
                            ? 0
                            : loadedPost?.gender === "انثى"
                            ? 1
                            : loadedPost?.gender === "الكل"
                            ? 2
                            : undefined
                        }
                      />
                    </Row>
                  </Col>

                  <Row className="RowDivElment">
                    <label className="label">التخصص: </label>
                    <MultiSelect
                      name="majors"
                      label="التخصصات"
                      options={options}
                      initValue={options.filter((option) =>
                        loadedPost?.post_majors.some(
                          (postMajor) => postMajor.major === option.major
                        )
                      )}
                    />
                  </Row>
                </Row>
                <div className="addbuttonContainer">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="add-button"
                    // disabled={isSubmitDisabled}

                    loading={loading}
                  >
                    {loading ? "جاري الإضافة..." : "اضافة"}
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

export default InstPostForm;

export const opportunityDataLoader = ({ params }) => {
  const postId = params.id;
  return defer({ post: getPost(postId) });
};
