import { Col, Row } from "antd";
import React from "react";
import FormInput from "./FormInput";
import EmailInput from "./EmailInput";
import PhoneInput from "./PhoneInput";

const InstManagerFormInputs = () => {
  return (
    <>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <FormInput label="الإسم الأول" name="fName" />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput label="الإسم الأخير" name="lName" />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput label="المسمى الوظيفي" name="managerPosition" />
        </Col>
        <Col xs={24} sm={12}>
          <EmailInput label="البريد الإلكتروني" name="managerEmail" />
        </Col>
        <Col xs={24} sm={12}>
          <PhoneInput
            label="رقم الجوال"
            name="managerPhone"
            placeholder="05XXXXXXXX"
          />
        </Col>
      </Row>
    </>
  );
};

export default InstManagerFormInputs;
