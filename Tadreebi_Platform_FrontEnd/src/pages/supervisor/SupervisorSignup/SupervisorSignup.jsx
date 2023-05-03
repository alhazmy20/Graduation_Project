import React from "react";
import "./SupervisorSignup.scss";
import { useNavigate } from "react-router-dom";
import api from "../../../data/axiosConfig";
import { Button, Form, notification } from "antd";
import FormInput from "../../../components/form/FormInput";
import {
  confirmPasswordRules,
  emailValidationRules,
  passwordRules,
} from "../../../Validation/rules";
import FormSelect from "../../../components/form/FormSelect";
import EmailInput from "../../../components/form/EmailInput";
import PasswordInput from "../../../components/form/PasswordInput";
import PasswordConfirInput from "../../../components/form/PasswordConfirInput";
import SubmitButton from "../../../components/form/SubmitButton";

const SupervisorSignup = () => {
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
    <div>
      <Form name="basic" className="form-wrapper" onFinish={onFinish}>
        <EmailInput label="البريد الجامعي" />
        <PasswordInput label="كلمة السر" />
        <PasswordConfirInput label="تأكيد كلمة السر" />

        <div className="btn-wrapper">
          <SubmitButton>تسجيل</SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default SupervisorSignup;
