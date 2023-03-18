import { Button, Card, Col, Form, Row } from "antd";
import React, { useState } from "react";
import FormInput from "../../../../components/form/FormInput";
import "./ResetPassword.scss";

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

  const rules = [
    { required: true, message: "الرجاء ادخال كلمة السر" },
    {
      message: "يجب أن لا يقل عن 8 أحرف، حرف كبير و حرف صغير و رقم",
      pattern: "^(?=.*[A-Z])(?=.*\\d).{8,}$",
    },
  ]

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
                label="كلمة السر الحالية"
                inputType="password"
                name="currentPassword"
                rules={rules}
              />
              <FormInput
                label="كلمة السر الجديدة"
                inputType="password"
                name="newPassword"
                rules={rules}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="تأكيد كلمة السر الجديدة"
                inputType="password"
                name="confirmNewPassword"
                rules={[
                  {
                    required: true,
                    message: "الرجاء تأكيد كلمة السر",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("كلمة السر غير متطابقة"));
                    },
                  }),
                ]}
              />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" className="save-button">
            حفظ
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
