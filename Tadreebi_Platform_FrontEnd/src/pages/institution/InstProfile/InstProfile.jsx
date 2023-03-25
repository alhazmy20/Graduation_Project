import { Button, Card, Col, Row, Form } from "antd";
import React, {  useState } from "react";
import FormInput from "../../../components/form/FormInput";
import ResetPassword from "../../../components/ui/PasswordReset/PasswordReset";
import PictureCircle from "../../../components/ui/PictureCircle/PictureCircle";
import "./InstProfile.scss";
import {phoneRules} from '../../../Validation/rules.js'

const InstProfile = () => {
    
    const [formData, setFormData] = useState({
        institutionName: "ggg",
        institutionField: "",
        city: "",
        institutionSector: "",
        region: "",
        email: "",
        fName: "",
        lName: "",
        managerEmail: "",
        managerPosition: "",
        managerPhone: "",
      });
    
      const handleFormChange = (changedValues, allValues) => {
        setFormData((prevState) => ({
          ...prevState,
          ...allValues,
        }));
      };

  const onFinish = async (values) => {
   console.log(formData);
  };
  
  return (
    <div className="institution-profile">
      <div className="profileImage">
        <PictureCircle />
        <span className="name">يزيد العلوي</span>
      </div>
      <Card className="card">
        <Form
        onValuesChange={handleFormChange}
        onFinish={onFinish}
          className="form"
          initialValues={formData}
        >
          <h1>بيانات المنشأة</h1>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="إسم المنشأة"
                labelCol={{ span: 24 }}
                name="institutionName"
              />
              <FormInput
                label="المنطقة"
                labelCol={{ span: 24 }}
                name="region"
              />
              <FormInput
                label="المدينة"
                labelCol={{ span: 24 }}
                name="city"

              />
            </Col>
            <Col xs={24} sm={12}>
              <FormInput
                label="القطاع"
                labelCol={{ span: 24 }}
                name="institutionSector"

              />
              <FormInput
                label="مجال العمل"
                labelCol={{ span: 24 }}
                name="institutionField"

              />
              <FormInput
                label="البريد الإلكتروني"
                labelCol={{ span: 24 }}
                name="email"
              />
            </Col>
          </Row>
          <h1>بيانات المسؤول</h1>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <FormInput
                label="الإسم الأول"
                labelCol={{ span: 24 }}
                name="fName"
              />
              <FormInput
                label="الإسم الأخير"
                labelCol={{ span: 24 }}
                name="lName"
              />
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
          <Button
            type="primary"
            htmlType="submit"
            className="save-button"
          >
            حفظ
          </Button>
        </Form>
      </Card>
      <ResetPassword />
    </div>
  );
};

export default InstProfile;
