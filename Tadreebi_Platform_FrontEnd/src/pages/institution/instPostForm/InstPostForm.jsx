import React, { useState } from "react";
import { Button, Input, Col, Row, Form, Radio, Select, DatePicker } from "antd";
import { RegionData } from "../../../data/TestData.js";
import { data } from "../../../data/SaudiClassification";
import ReactTextArea from "./components/ReactTextArea";
import "../instPostForm/InstPostForm.scss";
import ReactRadio from "./components/ReactRadio.jsx";
import MultiSelect from "./components/MultiSelect .jsx";
import CustomDatePicker from "./components/CustomDatePicker.jsx";
import moment from "moment";
import SelectRegion from "./components/SelectRegion.jsx";
const InstPostForm = () => {
  const [form] = Form.useForm();
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
  const formatDate = (dateValue) => {
    return moment(dateValue).format("YYYY-MM-DD");
  };

  const onFinish = async (values) => {
    //api code

    console.log(formPostData);
  };

  const handleEditorChange = (content) => {
    handleInputChange("content", content);
  };

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
    { label: "كليهما", value: 2 },
  ];

  return (
    <div className="institution-NewPostCont">
      <div className="pagePostTitle">
        <span className="name"> إضافة فرصة تدريبية</span>
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
              rules={[{ required: true, message: "الرجاء ادخال العنوان" }]}
            >
              <Input placeholder="عنوان فرصة التدريب ..." />
            </Form.Item>
          </Col>
          <Col style={{ textAlign: "left" }}>
            <ReactTextArea
              formdata={formPostData.content}
              formfun={handleEditorChange}
            />
          </Col>
          <Row className="formInputContainer">
            <Col className="InputsContainer">
              <Row className="RowDivElment">
                <label className="label">نوع البرنامج التدريبي: </label>
                <ReactRadio
                  name="t_type"
                  rules={[{ required: true, message: "الرجاء الاختيار" }]}
                  options={radioOptionsType}
                />
              </Row>

              <Row className="RowDivElment">
                <label className="label">المنطقة: </label>
                <SelectRegion name="region" options={RegionData} />
              </Row>
              <Row className="RowDivElment">
                <label className="label">تاريخ البدء: </label>
                <CustomDatePicker
                  name="t_startDate"
                  label="تاريخ بدء التدريب"
                  required={true}
                />
              </Row>
              <Row className="RowDivElment">
                <label className="label">تاريخ انتهاء الإعلان: </label>
                <CustomDatePicker
                  name="p_endDate"
                  label="تاريخ انتهاء الإعلان"
                  required={true}
                />
              </Row>
            </Col>

            <Col className="InputsContainer">
              <Row className="RowDivElment">
                <label className="label">مكافأة: </label>
                <ReactRadio
                  name="reward"
                  rules={[{ required: true, message: "الرجاء الاختيار" }]}
                  options={radioOptionsReward}
                />
              </Row>

              <Row className="RowDivElment">
                <label className="label">المدينة: </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "الرجاء إختيار المدينة",
                    },
                  ]}
                  name="city"
                  className="formItemStyle"
                >
                  <Select
                    style={{ flexGrow: "2" }}
                    defaultValue="اختر المدينة"
                    showSearch
                  >
                    <Select.Option key="*" value="كل المدن" />
                    {RegionData.filter(
                      (r) => r.region === formPostData.region
                    ).map((region) =>
                      region.cities.map((city) => (
                        <Select.Option key={city.id} value={city.city}>
                          {city.city}
                        </Select.Option>
                      ))
                    )}
                  </Select>
                </Form.Item>
              </Row>

              <Row className="RowDivElment">
                <label className="label">تاريخ الإنتهاء: </label>
                <CustomDatePicker
                  name="t_endDate"
                  label="تاريخ إنتهاء التدريب"
                  required={true}
                />
              </Row>

              <Row className="RowDivElment">
                <label className="label">الجنس: </label>
                <ReactRadio
                  name="gender"
                  rules={[{ required: true, message: "الرجاء الاختيار" }]}
                  options={radioOptionsGender}
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
              />
            </Row>
          </Row>
          <div className="addbuttonContainer">
            <Button type="primary" htmlType="submit" className="add-button">
              إضافة
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InstPostForm;
