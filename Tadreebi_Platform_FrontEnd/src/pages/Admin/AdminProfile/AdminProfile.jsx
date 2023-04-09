import React, { useState } from "react";
import "./AdminProfile.scss";
import FormCard from "../../../components/ui/FormCard/FormCard";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import { Button, Col, Form, Row, notification } from "antd";
import FormInput from "../../../components/form/FormInput";
import { emailValidationRules, phoneRules } from "../../../Validation/rules";
import { useFetch } from "../../../data/API";
import Spinner from "../../../components/ui/Spinner/Spinner";

const AdminProfile = () => {
  const [formData, setFormData] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const { data, loading, error } = useFetch(`http://localhost:8000/admin`);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const { data: adminData } = data;

  const onFormValuesChange = (changedValues, allValues) => {
    setIsFormChanged(
      Object.keys(changedValues).some(
        (key) => allValues[key] !== adminData[key]
      )
    );
  };

  const onFinish = (values) => {
    console.log(values);
    // setIsFormChanged(false);
    // message.success("تم تحديث البيانات بنجاح");
  };

  return (
    <div className="admin-profile">
      <FormCard className="card">
        <h1 className="green-underline">بيانات المشرف</h1>
        <Form
          onFinish={onFinish}
          initialValues={adminData}
          onValuesChange={onFormValuesChange}
        >
          <Row gutter={[16, 2]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="الإسم الأول"
                labelCol={{ span: 24 }}
                name="fName"
              />
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
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            className="form-btn"
            disabled={!isFormChanged} // Disable button if the form is not changed
          >
            حفظ
          </Button>
        </Form>
      </FormCard>
      <ResetPassword />
    </div>
  );
};

export default AdminProfile;
