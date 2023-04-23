import { Button, Col, Form, Row, notification } from "antd";
import React, { useState } from "react";
import FormInput from "../FormInput";
import "./PasswordReset.scss";
import { passwordRules, confirmPasswordRules } from "../../../Validation/rules";
import FormCard from "../../ui/FormCard/FormCard";
import api from "../../../data/axiosConfig";

const ResetPassword = ({ id }) => {
  // const [formData, setFormData] = useState(null);

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleFormChange = (changedValues, allValues) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     ...allValues,
  //   }));
  // };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await api().post(`api/user/${id}/change-password`, values);
      notification.success({ message: "تم تحديث كلمة السر بنجاح" });
      setLoading(false);
      setIsFormChanged(false);
    } catch (error) {
      setLoading(false);
      notification.error({ message: error.response.data.message });
    }
  };

  return (
    <div className="reset-password">
      <FormCard className="card">
        <h1 className="green-underline">تحديث كلمة السر</h1>
        <Form
          // onValuesChange={handleFormChange}
          onFinish={onFinish}
          className="form"
          // initialValues={formData}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="كلمة السر الحالية"
                inputType="password"
                name="old_password"
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
                name="password_confirmation"
                rules={confirmPasswordRules}
              />
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            className="form-btn"
            disabled={isFormChanged} // Disable button if the form is not changed
            loading={loading}
          >
            {loading ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <span className="error-message">لقد حدث خطأ</span>
        </Form>
      </FormCard>
    </div>
  );
};

export default ResetPassword;
