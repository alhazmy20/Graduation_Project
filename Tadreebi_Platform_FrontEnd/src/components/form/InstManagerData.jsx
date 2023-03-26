import { Col, Row } from 'antd';
import React from "react";
import { phoneRules } from '../../Validation/rules';
import FormInput from './FormInput';

const InstManagerData = ({ formData, handleFormChange }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <FormInput label="الإسم الأول" labelCol={{ span: 24 }} name="fName" />
          </Col>
          <Col xs={24} sm={12}>
          <FormInput
            label="الإسم الأخير"
            labelCol={{ span: 24 }}
            name="lName"
          />
          </Col>
          <Col xs={24} sm={12}>
          <FormInput
            label="المسمى الوظيفي"
            labelCol={{ span: 24 }}
            name="managerPosition"
          />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput
            label="البريد الإلكتروني"
            labelCol={{ span: 24 }}
            name="managerEmail"
          />
          </Col>
          <Col xs={24} sm={12}>
          <FormInput
            label="رقم الجوال"
            labelCol={{ span: 24 }}
            name="managerPhone"
            type="number"
            placeholder="05XXXXXXXX"
            rules={phoneRules}
          />
        </Col>
      </Row>
    </>
  );
};

export default InstManagerData;
