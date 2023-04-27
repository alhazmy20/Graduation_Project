import { Col } from "antd";
import React from "react";
import FormInput from "./FormInput";
import {
  confirmPasswordRules,
  emailValidationRules,
  passwordRules,
  phoneRules,
} from "../../Validation/rules";

const AdminFormInputs = ({ withPassword }) => {
  return (
    <>
      <Col xs={24} sm={12}>
        <FormInput label="الإسم الأول" labelCol={{ span: 24 }} name="fName" />
      </Col>
      <Col xs={24} sm={12}>
        <FormInput label="الإسم الأخير" labelCol={{ span: 24 }} name="lName" />
      </Col>
      <Col xs={24} sm={12}>
        <FormInput
          label="البريد الإلكتروني"
          labelCol={{ span: 24 }}
          name="email"
          rules={emailValidationRules}
        />
      </Col>
      <Col xs={24} sm={12}>
        <FormInput
          label="رقم الجوال"
          labelCol={{ span: 24 }}
          name="phone"
          inputType="number"
          placeholder="05XXXXXXXX"
          rules={phoneRules}
        />
      </Col>
      {withPassword && (
        <>
          <Col xs={24} sm={12}>
            <FormInput
              label="كلمة السر"
              inputType="password"
              name="password"
              rules={passwordRules}
            />
          </Col>
          <Col xs={24} sm={12}>
            <FormInput
              label="تأكيد كلمة السر"
              inputType="password"
              name="password_confirmation"
              rules={confirmPasswordRules}
            />
          </Col>
        </>
      )}
    </>
  );
};

export default AdminFormInputs;
