import { Button, Card, Col, Form, notification, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import FormInput from "../../../components/form/FormInput";
import InputFile from "../../../components/form/InputFile";
import PictureCircle from "../../../components/ui/PictureCircle/PictureCircle";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./StudentProfile.scss";
import { phoneRules } from "../../../Validation/rules.js";
import axios from "axios";
import Spinner from "../../../components/ui/Spinner/Spinner";

const StudentProfile = () => {
  let formData = new FormData();
  const [form] = Form.useForm();
  const [studentData, setStudentData] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/students/1")
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "لقد حدث خطأ",
          description: "لقد حدث خطأ ما، الرجاء المحاولة مرة أخرى",
        });
      });
      
  }, []);

  const onFinish = (values) => {
    // console.log(values);
    formData.append("FullName", values.fullName);
    formData.append("gender", values.gender);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("national_ID", values.national_ID);
    formData.append("university", values.university);
    formData.append("major", values.major);
    formData.append("GPA", values.GPA);
    formData.append("GPA_Type", values.GPA_Type);
    formData.append("collegeTranscript", values.collegeTranscript?.file);
    formData.append("internshipLetter", values.internshipLetter?.file);
    formData.append("nationalIdentity", values.nationalIdentity?.file);
    formData.append("cv", values.cv?.file);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    formData = new FormData();
  };

  const onFormValuesChange = (changedValues, allValues) => {
    setIsFormChanged(
      Object.keys(changedValues).some(
        (key) => allValues[key] !== studentData[key]
      )
    );
  };

  if (!studentData) {
    return <Spinner />;
  }

  return (
    <div className="student-profile">
      <div className="profileImage">
        <PictureCircle />
        <span className="name">يزيد العلوي</span>
      </div>
      <Card className="card">
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={onFormValuesChange} // Call onFormValuesChange on form value change
          className="form"
          encType="multipart/form-data"
          initialValues={studentData}
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
                name="national_ID"
                inputType="number"
              />
              <FormInput
                label="رقم الجوال"
                labelCol={{ span: 24 }}
                name="phone"
                inputType="number"
                rules={phoneRules}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput label="الجنس" labelCol={{ span: 24 }} name="gender" />

              <InputFile
                label="السيرة الذاتية"
                name="cv"
                fileName={studentData.cv}
              />
              <InputFile
                name="nationalIdentity"
                label="الهوية الوطنية"
                fileName={studentData.nationalIdentity}
              />
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
              <FormInput label="التخصص" labelCol={{ span: 24 }} name="major" />
              <Space>
                <FormInput
                  label="المعدل التراكمي"
                  labelCol={{ span: 24 }}
                  name="GPA"
                  inputType="number"
                />
                <FormInput label="من" labelCol={{ span: 24 }} name="GPA_Type" />
              </Space>
            </Col>
            <Col xs={24} sm={12}>
              <InputFile
                name="internshipLetter"
                label="خطاب التدريب"
                fileName={studentData.internshipLetter}
              />

              <InputFile
                name="collegeTranscript"
                label="السجل الأكاديمي"
                fileName={studentData.collegeTranscript}
              />
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            className="save-button"
            disabled={!isFormChanged} // Disable button if the form is not changed
          >
            حفظ
          </Button>
        </Form>
      </Card>
      <ResetPassword />
    </div>
  );
};

export default StudentProfile;
