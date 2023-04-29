import React, { Suspense, useState } from "react";
import { Button, Input, Col, Row, Form, notification } from "antd";
import { RegionData } from "../../../data/TestData.js";
import { data } from "../../../data/SaudiClassification";
import ReactTextArea from "./components/ReactTextArea";
import "../instPostForm/InstPostForm.scss";
import ReactRadio from "./components/ReactRadio.jsx";
import MultiSelect from "./components/MultiSelect .jsx";
import CustomDatePicker from "./components/CustomDatePicker.jsx";

import SelectRegion from "./components/SelectRegion.jsx";
import SelectCity from "./components/SelectCity.jsx";
import api from "../../../data/axiosConfig";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getPost } from "../../../util/api.js";
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";

const InstPostForm = () => {
  const opportunityData = useLoaderData();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formPostData, setFormPostData] = useState({
    title: "",
    content: "",
    t_type: "",
    reward: "",
    gender: "",
    region: "",
    city: "",
    t_startDate: "",
    t_endDate: "",
    p_endDate: "",
    majors: [],
  });

  const formatDate = (dateValue) => {
    return new Date(dateValue).toISOString().slice(0, 10);
  };

  const handleFormChange = (changedValues, allValues) => {
    const formattedValues = Object.entries(allValues).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: key.endsWith("Date") && value ? formatDate(value) : value,
      }),
      {}
    );
    setFormPostData((prevState) => ({
      ...prevState,
      ...formattedValues,
    }));
  };

  const onFinish = async (values) => {
    //api code
    try {
      await api().post(`api/posts`, formPostData);
      notification.success({ message: "تمت إضافة الفرصة  بنجاح" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      notification.error({ message: "فشل تحديث البيانات" });
    }
  };

  const isSubmitDisabled =
    formPostData.content.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  const handleInputChange = (name, value) => {
    if (name === "majors") {
      const majors = value.map((id) => ({
        SCC: id,
        major: options.find((option) => option.value === id)?.label || "",
      }));
      setFormPostData((prevState) => ({
        ...prevState,
        [name]: majors,
      }));
    } else {
      setFormPostData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  //for select tage
  const options = data
    .map((major) => {
      return major.majors.map((majorName) => ({
        label: majorName.title,
        value: majorName.id,
      }));
    })
    .flat();
  const radioOptionsType = [
    { label: "حضوري", value: "حضوري" },
    { label: "عن بعد", value: "عن بعد" },
  ];
  const radioOptionsReward = [
    { label: "نعم", value: 1 },
    { label: "لا", value: 0 },
  ];
  const radioOptionsGender = [
    { label: "ذكر", value: 0 },
    { label: "انثى", value: 1 },
    { label: "الكل", value: 2 },
  ];

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
                  <Form.Item
                    name="title"
                    rules={[
                      { required: true, message: "الرجاء ادخال العنوان" },
                    ]}
                    initialValue={loadedPost?.title}
                  >
                    <Input placeholder="عنوان فرصة التدريب ..." />
                  </Form.Item>
                </Col>
                <Col style={{ textAlign: "left" }}>
                  <ReactTextArea
                    name="content"
                    formdata={formPostData.content || loadedPost?.content}
                    handleInputChange={handleInputChange}
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
                        formDate={formPostData}
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
                      handleInputChange={handleInputChange}
                      options={options}
                      initValue={options.filter((option) =>
                        loadedPost?.post_majors.some(
                          (postMajor) => postMajor.major === option.label
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
                    disabled={isSubmitDisabled}
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
