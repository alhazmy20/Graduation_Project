import { Button, Col, Form, Row, Space, notification } from "antd";
import React, { useState, Suspense } from "react";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./StudentProfile.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";
import ProfileImage from "../../../components/ui/ProfileImage/ProfileImage";
import FormCard from "../../../components/ui/FormCard/FormCard";
import FormInput from "../../../components/form/FormInput";
import {
  emailValidationRules,
  inputGpaRules,
  nationalIdRules,
  phoneRules,
} from "../../../Validation/rules";
import InputFile from "../../../components/form/InputFile";
import { useAuth } from "../../../auth/useContext";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import { getStudent } from "../../../util/api";
import api from "../../../data/axiosConfig";

const StudentProfile = ({ isAdmin }) => {
  const studentData = useLoaderData();
  console.log(studentData);

  const { id } = useParams();
  const auth = useAuth();

  let formData = new FormData();
  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        if (
          key === "transcript" ||
          key === "internshipLetter" ||
          key === "nationalID" ||
          key === "CV"
        ) {
          formData.append(key, values[key]?.file);
        } else {
          formData.append(key, values[key]);
        }
      }
    }

    try {
      await api().post(
        `api/students/${id || auth.user.id}/upload?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notification.success({ message: "تم تحديث البيانات بنجاح" });
      setLoading(false);
      setIsFormChanged(false);
    } catch (error) {
      console.log(error);
      notification.error({ message: "فشل تحديث البيانات" });
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

  const extractName = (fullName) => {
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `${firstName} ${lastName}`;
  };

  return (
    <div className="student-profile">
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={studentData?.student}
          errorElement={<p>Error loading the data.</p>}
        >
          {(loadedData) => (
            <>
              <div className="profileImage">
                <ProfileImage
                  name={extractName(loadedData.fullName)}
                  personalPicture_url={
                    loadedData.studentFiles.personalPicture_url
                  }
                  userType="students"
                />
              </div>
              <FormCard className="card">
                <Form
                  form={form}
                  onFinish={onFinish}
                  onValuesChange={onFormValuesChange}
                  className="form"
                  encType="multipart/form-data"
                  initialValues={loadedData}
                >
                  <h1 className="green-underline">البيانات الأساسية</h1>
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
                      <InputFile
                        label="السيرة الذاتية"
                        name="cv"
                        fileName={loadedData.studentFiles.CV_filename}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <InputFile
                        name="nationalIdentity"
                        label="الهوية الوطنية"
                        fileName={loadedData.studentFiles.nationalID_filename}
                      />
                    </Col>
                  </Row>
                  <h1 className="green-underline">البيانات الأكاديمية</h1>
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
                          rules={inputGpaRules(loadedData.GPA_Type)}
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
                        fileName={
                          loadedData.studentFiles.internshipLetter_filename
                        }
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <InputFile
                        name="collegeTranscript"
                        label="السجل الأكاديمي"
                        fileName={loadedData.studentFiles.transcript_filename}
                      />
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="form-btn"
                    disabled={!isFormChanged} // Disable button if the form is not changed
                    loading={loading}
                  >
                    {loading ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                </Form>
              </FormCard>
              {!isAdmin && <ResetPassword />}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default StudentProfile;

export const studentLoaderWithId = ({ params }) => {
  const instId = params.id;
  return defer({ student: getStudent(instId) });
};

export const studentLoader = () => {
  const student = JSON.parse(localStorage.getItem("user"));
  return defer({ student: getStudent(student.id) });
};
