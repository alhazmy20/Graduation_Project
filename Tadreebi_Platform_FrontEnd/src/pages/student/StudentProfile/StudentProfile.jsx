import { Button, Col, Form, Row, Space, notification } from "antd";
import React, { useState } from "react";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./StudentProfile.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";
import ProfileImage from "../../../components/ui/ProfileImage/ProfileImage";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { useFetch } from "../../../data/API";
import FormInput from "../../../components/form/FormInput";
import { emailValidationRules, inputGpaRules, nationalIdRules, phoneRules } from "../../../Validation/rules";
import InputFile from "../../../components/form/InputFile";
import { useParams } from "react-router";

const StudentProfile = ({ isAdmin }) => {
  // const { data, loading, error } = useFetch("http://localhost:8000/students/1");
  const {id} = useParams();

  console.log(id);
  const { data, loading, error } = useFetch(
    isAdmin
      ? `http://localhost:8000/student`
      : `http://localhost:8000/student`
  );

  let formData = new FormData();
  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);

  const onFinish = (values) => {
    console.log(values);

    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        if (
          key === "collegeTranscript" ||
          key === "internshipLetter" ||
          key === "nationalIdentity" ||
          key === "cv"
        ) {
          formData.append(key, values[key]?.file);
        } else {
          formData.append(key, values[key]);
        }
      }
    }

    //NOTE Delete this
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    formData = new FormData();
  };

  const onFormValuesChange = (changedValues, allValues) => {
    setIsFormChanged(
      Object.keys(changedValues).some((key) => allValues[key] !== data[key])
    );
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const { data: studentData    } = data;
  const { studentFiles: files   } = studentData;

  const nameParts = studentData.fullName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];


  return (
    <div className="student-profile">
      <div className="profileImage">
        <ProfileImage
          name={`${firstName} ${lastName}`}
          personalPicture_url={files.personalPicture_url}
        />
      </div>
      <FormCard className="card">
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={onFormValuesChange}
          className="form"
          encType="multipart/form-data"
          initialValues={studentData}
        >
          <h1 className='green-underline'>البيانات الأساسية</h1>
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="الإسم الرباعي"
                labelCol={{ span: 24 }}
                name="fullName"
                disabled={!isAdmin}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="البريد الإلكتروني"
                labelCol={{ span: 24 }}
                name="email"
                disabled={!isAdmin}
                rules={emailValidationRules}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="رقم الهوية"
                labelCol={{ span: 24 }}
                name="national_ID"
                inputType="number"
                disabled={!isAdmin}
                rules={nationalIdRules}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="رقم الجوال"
                labelCol={{ span: 24 }}
                name="phone"
                inputType="number"
                rules={phoneRules}
              />
            </Col>

            <Col xs={24} sm={12}>
              <FormInput
                label="الجنس"
                labelCol={{ span: 24 }}
                name="gender"
                disabled={!isAdmin}
              />
            </Col>

            <Col xs={24} sm={12}>
              <InputFile label="السيرة الذاتية" name="cv" fileName={files.CV_filename} />
            </Col>
            <Col xs={24} sm={12}>
              <InputFile
                name="nationalIdentity"
                label="الهوية الوطنية"
                fileName={files.nationalID_filename}
              />
            </Col>
          </Row>
          <h1 className='green-underline'>البيانات الأكاديمية</h1>
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="اسم الجامعة"
                labelCol={{ span: 24 }}
                name="university"
                disabled={!isAdmin}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="التخصص"
                labelCol={{ span: 24 }}
                name="major"
                disabled={!isAdmin}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Space>
                <FormInput
                  label="المعدل التراكمي"
                  labelCol={{ span: 24 }}
                  name="GPA"
                  inputType="number"
                  rules={inputGpaRules(data.GPA_Type)}
                />
                <FormInput
                  label="من"
                  labelCol={{ span: 24 }}
                  name="GPA_Type"
                  disabled={!isAdmin}
                />
              </Space>
            </Col>

            <Col xs={24} sm={12}>
              <InputFile
                name="internshipLetter"
                label="خطاب التدريب"
                fileName={files.internshipLetter_filename}
              />
            </Col>
            <Col xs={24} sm={12}>
              <InputFile
                name="collegeTranscript"
                label="السجل الأكاديمي"
                fileName={files.transcript_filename}
              />
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            className="form-btn"
            disabled={!isFormChanged} // Disable button if the form is not changed
          >
            حفظ
          </Button>
        </Form>
      </FormCard>
      {!isAdmin && <ResetPassword />}
    </div>
  );
};

export default StudentProfile;
