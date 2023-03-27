import React, { useState } from "react";
import { Button, Input, Col, Row, Form, Radio, Select, DatePicker } from "antd";
import { RegionData } from "../../../data/TestData.js";
import { data } from "../../../data/SaudiClassification";
import ReactTextArea from "./components/ReactTextArea";
import "../instPostForm/InstPostForm.scss";

const InstPostForm = () => {
  const [formPostData, setFormPostData] = useState({
    title: "",
    desc: "",
    type: "",
    region: "",
    startData: "",
    endDate: "",
    reward: "",
    city: "",
    endDatePost: "",
    gender: "",
    majors: [],
  });

  const handleFormChange = (changedValues, allValues) => {
    setFormPostData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
  };

  const onFinish = async (values) => {
    //api code
    console.log(formPostData);
  };

  const handleEditorChange = (content) => {
    handleInputChange("desc", content);
  };
  //v1
  //   const handleInputChange = (name, value) => {
  //     setFormPostData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };
  //v2
  const handleInputChange = (name, value) => {
    if (name === "majors") {
      const majors = value.map((id) => ({
        id: id,
        title: options.find((option) => option.value === id)?.label || "",
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
        >
          <Col>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "الرجاء ادخال العنوان" }]}
            >
              <Input name="title" placeholder="عنوان فرصة التدريب ..." />
            </Form.Item>
          </Col>
          <Col style={{ textAlign: "left" }}>
            <ReactTextArea
              formdata={formPostData.desc}
              formfun={handleEditorChange}
            />
          </Col>
          <Row style={{ marginTop: "30px" }}>
            <Col style={{ width: "50%", padding: "10px" }}>
              <Row className="RowDivElment">
                <label className="label">نوع البرنامج التدريبي: </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "الرجاء الاختيار",
                    },
                  ]}
                  style={{ flexGrow: "2", justifyContent: "center" }}
                >
                  <Radio.Group
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    value={formPostData.type}
                  >
                    <Radio value={"حضوري"}>حضوري</Radio>
                    <Radio value={"عن بعد"}>عن بعد</Radio>
                  </Radio.Group>
                </Form.Item>
              </Row>

              <Row className="RowDivElment">
                <label className="label">المنطقة: </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "الرجاء إختيار المنطقة",
                    },
                  ]}
                  name="region"
                  className="form-item"
                  style={{ flexGrow: "2", justifyContent: "center" }}
                >
                  <Select
                    style={{ flexGrow: "2" }}
                    defaultValue="اختر المنطقة"
                    showSearch
                    onChange={(value) => handleInputChange("region", value)}
                  >
                    <Select.Option key="*" value="كل المناطق" />
                    {RegionData.map((region) => (
                      <Select.Option key={region.id} value={region.region}>
                        {region.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>
              <Row className="RowDivElment">
                <label className="label">تاريخ البدء: </label>

                <DatePicker
                  placeholder="اختر تاريخ بدء التدريب"
                  style={{ flexGrow: "2" }}
                  name="startData"
                  onChange={(date, dateString) =>
                    handleInputChange("startData", dateString)
                  }
                />
              </Row>
              <Row className="RowDivElment">
                <label className="label">تاريخ انتهاء الإعلان: </label>

                <DatePicker
                  placeholder="اختر تاريخ انتهاء الإعلان"
                  style={{ flexGrow: "2" }}
                  name="endDatePostendDatePost"
                  onChange={(date, dateString) =>
                    handleInputChange("endDatePost", dateString)
                  }
                />
              </Row>
            </Col>

            <Col style={{ width: "50%", padding: "10px" }}>
              <Row className="RowDivElment">
                <label className="label">مكافأة: </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "الرجاء  الاختيار",
                    },
                  ]}
                  style={{ flexGrow: "2", justifyContent: "center" }}
                >
                  <Radio.Group
                    onChange={(e) =>
                      handleInputChange("reward", e.target.value)
                    }
                    value={formPostData.reward}
                  >
                    <Radio value={"نعم"}>نعم</Radio>
                    <Radio value={"لا"}>لا</Radio>
                  </Radio.Group>
                </Form.Item>
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
                  className="form-item"
                  name="city"
                  style={{ flexGrow: "2", justifyContent: "center" }}
                >
                  <Select
                    style={{ flexGrow: "2" }}
                    defaultValue="اختر المدينة"
                    showSearch
                    onChange={(value) => handleInputChange("city", value)}
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

                <DatePicker
                  placeholder="اختر تاريخ إنتهاء التدريب"
                  style={{ flexGrow: "2" }}
                  name="endDate"
                  onChange={(date, dateString) =>
                    handleInputChange("endDate", dateString)
                  }
                />
              </Row>

              <Row className="RowDivElment">
                <label className="label">الجنس: </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "الرجاء الاختيار",
                    },
                  ]}
                  style={{ flexGrow: "2", justifyContent: "center" }}
                >
                  <Radio.Group
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    value={formPostData.gender}
                  >
                    <Radio value={"ذكر"}>ذكر</Radio>
                    <Radio value={"انثى"}>انثى</Radio>
                    <Radio value={"كليهما"}>كليهما</Radio>
                  </Radio.Group>
                </Form.Item>
              </Row>
            </Col>

            <Row className="RowDivElment" style={{ width: "100%" }}>
              <label className="label">التخصص: </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء إختيار التخصصات",
                  },
                ]}
                style={{ flexGrow: "2", justifyContent: "center" }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="اختر التخصصات"
                  onChange={(e) => handleInputChange("majors", e)}
                  options={options}
                />
              </Form.Item>
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
