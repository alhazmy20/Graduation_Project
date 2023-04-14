import React, { useState } from "react";
import "./StudentSignup.scss";
import { Button, Form, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { UNIVERSITIES } from "../../../data/StudentData.js";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import {
  passwordRules,
  confirmPasswordRules,
  emailValidationRules,
} from "../../../Validation/rules.js";
import { data as saudiClassificationData } from "../../../data/SaudiClassification";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    university: "",
    major: "",
  });

  const handleFormChange = (allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
  };

  const onFinish = (values) => {
    console.log(formData);
    navigate("/verify-account");
  };

  const majorOptions = saudiClassificationData.flatMap(({ majors }) =>
    majors.map(({ id, title: label }) => ({ label, value: label }))
  );

  return (
    <div className="student-signup">
      <Form
        name="basic"
        className="form-wrapper"
        onValuesChange={handleFormChange}
        onFinish={onFinish}
      >
        <FormInput
          label="البريد الجامعي"
          name="email"
          rules={emailValidationRules}
        />
        <FormInput
          label="كلمة السر"
          inputType="password"
          name="password"
          rules={passwordRules}
        />
        <FormInput
          label="تأكيد كلمة السر"
          inputType="password"
          name="password_confirmation"
          rules={confirmPasswordRules}
        />

        <FormSelect label="الجامعة" name="university">
          {UNIVERSITIES.map((university) => (
            <Select.Option key={university.id} value={university.name}>
              {university.name}
            </Select.Option>
          ))}
        </FormSelect>

        <FormSelect label="التخصص" name="major" options={majorOptions} />

        <div className="btn-wrapper">
          <Button type="primary" htmlType="submit" className="form-btn">
            تسجيل
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StudentSignup;
