import { Button, Card, Col, Form, message, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import FormInput from "../../../components/form/FormInput";
import InputFile from "../../../components/form/InputFile";
import PictureCircle from "../../../components/ui/PictureCircle/PictureCircle";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./StudentProfile.scss";
import { phoneRules } from "../../../Validation/rules.js";
import { GetNewsId } from "../../../data/API";

const StudentProfile = () => {
  const formData = new FormData();
  const { data, error, loading } = GetNewsId(
    `http://localhost:8000/students/1`
  );

  const [studentData, setStudentData] = useState({
    fullName: "ddd",
    gender: "",
    email: "",
    phone: "",
    national_ID: "",
    university: "",
    major: "",
    GPA: "",
    GPA_Type: "",
    cv: "",
    nationalIdentity: "",
    internshipLetter: "",
    collegeTranscript: "",
  });

  const [formInitialValues, setFormInitialValues] = useState(studentData);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add new state

  const handleFormChange = (changedValues, allValues) => {
    setStudentData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
  };

  // useEffect(
  //   (e) => {
  //     console.log(data);
  //   },
  //   [data]
  // );

  const onFinish = async (values) => {
    formData.append("FullName", values.fullName);
    formData.append("gender", values.gender);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("national_ID", values.nationalId);
    formData.append("university", values.university);
    formData.append("major", values.major);
    formData.append("GPA", values.GPA);
    formData.append("GPA_Type", values.GPA_Type);
    formData.append("collegeTranscript", values.collegeTranscript.file);
    formData.append("internshipLetter", values.internshipLetter.file);
    formData.append("nationalIdentity", values.nationalIdentity.file);
    formData.append("cv", values.cv.file);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    setIsSubmitting(true); // Set isSubmitting to true before submitting the form
    console.log(formData);
    setTimeout(() => {
      setIsSubmitting(false); // Set isSubmitting to false after submitting the form
    }, 2000);
    setFormInitialValues(formData);
    message.success("تم تحديث البيانات بنجاح");
  };

  let isButtonDisabled =
    JSON.stringify(setStudentData) === JSON.stringify(formInitialValues);

  return (
    <div className="student-profile">
      <div className="profileImage">
        <PictureCircle />
        <span className="name">يزيد العلوي</span>
      </div>
      <Card className="card">
        <Form
          onValuesChange={handleFormChange}
          onFinish={onFinish}
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
            disabled={isButtonDisabled}
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </Form>
      </Card>
      <ResetPassword />
    </div>
  );
};

export default StudentProfile;
