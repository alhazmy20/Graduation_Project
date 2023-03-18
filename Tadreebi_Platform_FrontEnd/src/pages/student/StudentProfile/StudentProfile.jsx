import { Button, Card, Col, Form, Row, Space } from "antd";
import axios from 'axios';
import React, { useState } from "react";
import FormInput from "../../../components/form/FormInput";
import UploadeFile from "../../../components/form/UploadFile";
import ResetPassword from "./components/ResetPassword";
import "./StudentProfile.scss";

const StudentProfile = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    FullName: "",
    gender: "",
    email: "",
    phone: "",
    nationalId: "",
    universityName: "",
    major: "",
    gpa: "",
    collegeTranscript: null,
    internshipLetter: null,
    nationalIdentity: null,
    cv: null,
  });

  const handleFormChange = (changedValues, allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
  };

  const onFinish = async (values) => {
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        data.append(key, value);
      }
    }
    try {
      const response = await axios.post("<your_api_url>", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="student-profile">
      <Card className="card">
        <Form
          form={form}
          onValuesChange={handleFormChange}
          onFinish={onFinish}
          className="form"
        >
          <h1>البيانات الأساسية</h1>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="الإسم الرباعي"
                labelCol={{ span: 24 }}
                name="fullName"
              />
              <FormInput
                label="البريد الإلكتروني"
                labelCol={{ span: 24 }}
                name="email"
              />
              <FormInput
                label="رقم الهوية"
                labelCol={{ span: 24 }}
                name="nationalId"
              />
              <UploadeFile name="cv" label="السيرة الذاتية" />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput label="الجنس" labelCol={{ span: 24 }} name="gender" />

              <FormInput
                label="رقم الجوال"
                labelCol={{ span: 24 }}
                name="phone"
              />
              <UploadeFile name="nationalIdentity" label="الهوية الوطنية" />
            </Col>
          </Row>
          <h1>البيانات الأكاديمية</h1>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="اسم الجامعة"
                labelCol={{ span: 24 }}
                name="university"
              />
              <Space>
                <FormInput
                  label="المعدل التراكمي"
                  labelCol={{ span: 24 }}
                  name="gpa"
                  // remove the style property
                />
                <FormInput
                  label="من"
                  labelCol={{ span: 24 }}
                  name="gpaType"
                  // add the style property to make it take 50% of the width
                  style={{ width: "50%" }}
                />
              </Space>
              <UploadeFile name="internshipLetter" label="خطاب التدريب" />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput label="التخصص" labelCol={{ span: 24 }} name="major" />

              <UploadeFile name="collegeTranscript" label="السجل الأكاديمي" />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" className="save-button">
            حفظ
          </Button>
        </Form>
      </Card>
      <ResetPassword />
    </div>
  );
};

export default StudentProfile;
