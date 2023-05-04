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
import UniversitySelect from "../../../components/form/UniversitySelect";

const SupervisorSignup = () => {
  const navigate = useNavigate();

  const options = [
    {
      value: "0",
      label: "ذكور",
    },
    {
      value: "1",
      label: "الإناث",
    },
    {
      value: "2",
      label: "الكل",
    },
  ];

  const onFinish = (values) => {
    console.log(values);
    api()
      .get("/api/csrf-token")
      .then((response) => {
        const csrfToken = response.data.data.csrf_token;
        localStorage.setItem("csrf_token", csrfToken);
      })
      .then(() => {
        api()
          .post("/api/supervisors", values)
          .then(() => {
            navigate("/verify-account");
          })
          .catch((error) => {
            console.log(error);
            const errorMessages = error.response.data.message;
            notification.error({ message: errorMessages });
          });
      });
  };

  return (
    <div>
      <Form name="basic" className="form-wrapper" onFinish={onFinish}>
        <EmailInput label="البريد الجامعي" />
        <FormSelect
          label="مسؤول التدريب في شطر"
          name="section"
          options={options}
        />
        <UniversitySelect label="الجامعة" />
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
