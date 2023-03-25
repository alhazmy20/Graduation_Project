import { Button, Card, Col, Form, Row } from "antd";
import React, { useState } from "react";
import FormInput from "../../form/FormInput";
import "./PasswordReset.scss";
import {passwordRules, confirmPasswordRules} from '../../../Validation/rules.js'

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleFormChange = (changedValues, allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
  };

  const onFinish = (values) => {
    console.log(formData);
  };

  return (
    <div className="reset-password">
      <Card className="card">
        <Form
          form={form}
          onValuesChange={handleFormChange}
          onFinish={onFinish}
          className="form"
        >
          <h1>تحديث كلمة السر</h1>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="كلمة السر الجديدة"
                inputType="password"
                name="newPassword"
                rules={passwordRules}
              />
              <FormInput
                label="كلمة السر الحالية"
                inputType="password"
                name="currentPassword"
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
          <Button type="primary" htmlType="submit" className="save-button">
            حفظ
          </Button>
          <span className="error-message">لقد حدث خطأ</span>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
