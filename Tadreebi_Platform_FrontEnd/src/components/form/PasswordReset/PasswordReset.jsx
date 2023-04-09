import { Button, Card, Col, Form, Row } from "antd";
import React, { useState } from "react";
import FormInput from '../FormInput';
import "./PasswordReset.scss";
import { passwordRules, confirmPasswordRules } from "../../../Validation/rules";
import FormCard from '../../ui/FormCard/FormCard';

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);

  const handleFormChange = (changedValues, allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="reset-password">
      <FormCard className="card">
      <h1 className='green-underline'>تحديث كلمة السر</h1>
        <Form
          form={form}
          onValuesChange={handleFormChange}
          onFinish={onFinish}
          className="form"
          initialValues={formData}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="كلمة السر الحالية"
                inputType="password"
                name="currentPassword"
                rules={passwordRules}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="كلمة السر الجديدة"
                inputType="password"
                name="password"
                rules={passwordRules}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="تأكيد كلمة السر الجديدة"
                inputType="password"
                name="confirmNewPassword"
                rules={confirmPasswordRules}
              />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" className="form-btn">
            حفظ
          </Button>
          <span className="error-message">لقد حدث خطأ</span>
        </Form>
      </FormCard>
    </div>
  );
};

export default ResetPassword;
