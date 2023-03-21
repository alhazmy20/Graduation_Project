import { Button, Card, Col, Form, message, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import FormInput from "../../../components/form/FormInput";
import InputFile from "../../../components/form/InputFile";
import PictureCircle from "../../../components/ui/PictureCircle/PictureCircle";
import ResetPassword from "./components/ResetPassword";
import "./StudentProfile.scss";

const StudentProfile = () => {
  const formData = new FormData();

  const [disabledButton, setDisabledButton] = useState(true);
  const [data, setData] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    nationalId: "",
    major: "",
    gpa: "",
    cv: "",
    nationalIdentity: "",
    internshipLetter: "",
    collegeTranscript: "",
  });

  const handleFormChange = (changedValues, allValues) => {
    setData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
    setDisabledButton((Object.values(allValues).every((value) => !value)))
  };

  useEffect(
    (e) => {
      console.log(data);
    },
    [data]
  );

  const onFinish = async (values) => {
    formData.append("FullName", values.fullName);
    formData.append("gender", values.gender);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("nationalId", values.nationalId);
    formData.append("universityName", values.university);
    formData.append("major", values.major);
    formData.append("gpa", values.gpa);
    formData.append("collegeTranscript", values.collegeTranscript.file);
    formData.append("internshipLetter", values.internshipLetter.file);
    formData.append("nationalIdentity", values.nationalIdentity.file);
    formData.append("cv", values.cv.file);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

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
          defaultValue={data}
        >
          <h1>البيانات الأساسية</h1>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="الإسم الرباعي"
                labelCol={{ span: 24 }}
                name="fullName"
                disabled={true}
                //NOTE Edit this
                value='يزيد سعد نفاع العلوي'
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
                disabled={true}
                //NOTE Edit this
                value='1107474545'
              />
              <FormInput
              label="رقم الجوال"
              labelCol={{ span: 24 }}
              name="phone"
            />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="الجنس"
                labelCol={{ span: 24 }}
                name="gender"
                disabled={true}
                //NOTE Edit this
                value='ذكر'
              />

              <InputFile label="السيرة الذاتية" name="cv" />
              <InputFile name="nationalIdentity" label="الهوية الوطنية" />
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
              <Space >
                <FormInput
                  label="المعدل التراكمي"
                  labelCol={{ span: 24 }}
                  name="gpa"
                />
                <FormInput
                  label="من"
                  labelCol={{ span: 24 }}
                  name="gpaType"
                  disabled={true}
                  //NOTE Edit this
                  value='5'
                />
              </Space>
            </Col>
            <Col xs={24} sm={12}>
            <InputFile name="internshipLetter" label="خطاب التدريب" />

              <InputFile name="collegeTranscript" label="السجل الأكاديمي" />
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            className="save-button"
            disabled={disabledButton}
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
