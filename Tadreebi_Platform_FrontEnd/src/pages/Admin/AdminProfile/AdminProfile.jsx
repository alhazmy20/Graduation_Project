import React from "react";
import "./AdminProfile.scss";
import FormCard from "../../../components/ui/FormCard/FormCard";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import { Col, Row } from "antd";
import FormInput from "../../../components/form/FormInput";

const AdminProfile = () => {
  return (
    <div className="admin-profile">
      <FormCard className="card">
        <h1>بيانات المنشأة</h1>
        <Row gutter={[16, 2]}>
          <Col xs={24} sm={12}>
            <FormInput
              label="إسم المنشأة"
              labelCol={{ span: 24 }}
              name="institutionName"
            />
          </Col>
          <Col xs={24} sm={12}>
            <FormInput
              label="إسم المنشأة"
              labelCol={{ span: 24 }}
              name="institutionName"
            />
          </Col>
          <Col xs={24} sm={12}>
            <FormInput
              label="إسم المنشأة"
              labelCol={{ span: 24 }}
              name="institutionName"
            />
          </Col>
          <Col xs={24} sm={12}>
            <FormInput
              label="إسم المنشأة"
              labelCol={{ span: 24 }}
              name="institutionName"
            />
          </Col>
        </Row>
      </FormCard>
      <ResetPassword />
    </div>
  );
};

export default AdminProfile;
