import React from "react";
import "./SupervisorSignup.scss";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../../util/axiosConfig";
import { Form, notification } from "antd";
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
      label: "الطلاب",
    },
    {
      value: "1",
      label: "الطالبات",
    },
    {
      value: "2",
      label: "الكل",
    },
  ];

  const onFinish = (values) => {
    console.log(values);
    axiosConfig()
      .get("/api/csrf-token")
      .then((response) => {
        const csrfToken = response.data.data.csrf_token;
        localStorage.setItem("csrf_token", csrfToken);
      })
      .then(() => {
        axiosConfig()
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
          label="الشطر"
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
