import React from "react";
import "./StudentSignup.scss";
import { Button, Form, Select, notification } from "antd";
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
import api from '../../../data/axiosConfig'

const StudentSignup = () => {
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   password_confirmation: "",
  //   university: "",
  //   major: "",
  // });

  // const handleFormChange = (allValues) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     ...allValues,
  //   }));
  // };

  const onFinish = (values) => {
    
    values.SCC = values.SCC.substring(0, 2);// Extract the first two characters of the SCC value
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

  // const majorOptions = saudiClassificationData.flatMap(({ majors }) =>
  //   majors.map(({ id, title: label }) => ({ id, value: label }))
  // );
  
  const majorOptions = saudiClassificationData.flatMap(({ majors }) =>
  majors.map(({ id, title: label }) => ({ label, value: id }))
);

  return (
    <div className="student-signup">
      <Form
        name="basic"
        className="form-wrapper"
        // onValuesChange={handleFormChange}
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

        <FormSelect label="التخصص" name="SCC" options={majorOptions} />

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
