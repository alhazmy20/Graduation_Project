import { Col } from "antd";
import React from "react";
import FormInput from "./FormInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import PasswordConfirInput from "./PasswordConfirInput";
import PhoneInput from "./PhoneInput";

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
        <EmailInput label="البريد الإلكتروني" />
      </Col>
      <Col xs={24} sm={12}>
        <PhoneInput label="رقم الجوال" placeholder="05XXXXXXXX" />
      </Col>
      {withPassword && (
        <>
          <Col xs={24} sm={12}>
            <PasswordInput label="كلمة السر" />
          </Col>
          <Col xs={24} sm={12}>
            <PasswordConfirInput label="تأكيد كلمة السر" />
          </Col>
        </>
      )}
    </>
  );
};

export default AdminFormInputs;
