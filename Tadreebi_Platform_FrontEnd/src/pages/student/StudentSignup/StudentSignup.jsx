import React from "react";
import "./StudentSignup.scss";
import { Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../../data/axiosConfig";
import EmailInput from "../../../components/form/EmailInput";
import PasswordInput from "../../../components/form/PasswordInput";
import PasswordConfirInput from "../../../components/form/PasswordConfirInput";
import SubmitButton from "../../../components/form/SubmitButton";
import MajorsSelect from "../../../components/form/MajorsSelect";
import UniversitySelect from "../../../components/form/UniversitySelect";

const StudentSignup = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    values.SCC = values.SCC.substring(0, 2); // Extract the first two characters of the SCC value
    api()
      .get("/api/csrf-token")
      .then((response) => {
        const csrfToken = response.data.data.csrf_token;
        localStorage.setItem("csrf_token", csrfToken);
      })
      .then(() => {
        api()
          .post("/api/students", values)
          .then(() => {
            navigate("/verify-account");
          })
          .catch((error) => {
            const errorMessages = error.response.data.message;
            notification.error({ message: errorMessages });
          });
      });
  };

  return (
    <div className="student-signup">
      <Form name="basic" className="form-wrapper" onFinish={onFinish}>
        <EmailInput label="البريد الجامعي" />

        <PasswordInput label="كلمة السر" />
        <PasswordConfirInput label="تأكيد كلمة السر" />

        <UniversitySelect label="الجامعة" />

        <MajorsSelect label="التخصص" name="SCC" />

        <div className="btn-wrapper">
          <SubmitButton>تسجيل</SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default StudentSignup;
