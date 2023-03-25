import React, { useState } from "react";
import "./StudentSignup.scss";
import { Button, Form, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UNIVERSITIES } from "../../../data/StudentData.js";
import mobile_login_amico from "../../../assets/images/mobile_login_amico.png";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import { passwordRules, confirmPasswordRules} from '../../../Validation/rules.js'

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

  return (
    <div className="student-signup">
      <div className="card">
        <div className="form-container">
          <h4>إنشاء حساب جديد</h4>
          <Form
            name="basic"
            className="form-wrapper"
            onValuesChange={handleFormChange}
            onFinish={onFinish}
          >
            <FormInput
              label="البريد الجامعي"
              name="email"
              rules={[
                { message: "الرجاء إدخال بريد الكتروني صالح", type: "email" },
              ]}
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
              name="confirmPassword"
              rules={confirmPasswordRules}
            />

            <FormSelect
              label="الجامعة"
              name="university"
            >
              {UNIVERSITIES.map((university) => (
                <Select.Option key={university.id} value={university.name}>
                  {university.name}
                </Select.Option>
              ))}
            </FormSelect>

            <FormSelect
              label="التخصص"
              name="major"
            >
              {UNIVERSITIES.map((university) => (
                <Select.Option key={university.id} value={university.name}>
                  {university.name}
                </Select.Option>
              ))}
            </FormSelect>

            <div className="btn-wrapper">
              <Button type="primary" htmlType="submit">
                تسجيل
              </Button>
            </div>
          </Form>
          <span>
            لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>
          </span>
        </div>
        <img src={mobile_login_amico} alt="" />
      </div>
    </div>
  );
};

export default StudentSignup;
