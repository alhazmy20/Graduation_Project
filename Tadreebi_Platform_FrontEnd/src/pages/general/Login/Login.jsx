import "./Login.scss";
import { Button, Col, Form, Row, message, notification } from "antd";
import React from "react";
import Container from "../../../layouts/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import FormCard from "../../../components/ui/FormCard/FormCard";
import FormInput from "../../../components/form/FormInput";
import { emailValidationRules, passwordRules } from "../../../Validation/rules";
import api from "../../../data/axiosConfig";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await api().get("/api/csrf-token");
      const res = await api().post("/api/login/", values);
      console.log(res.data);
      localStorage.setItem("bearer_token", res.data.token);
      navigate("/");
    } catch (error) {
      message.error("خطأ في تسجيل الدخول. يرجى التحقق من صحة البريد الإلكتروني وكلمة المرور.");
    }
  };
  

  return (
    <Container className="login-container">
      <Row justify="center" align="middle" className="login">
        <Col lg={10} md={18} xs={24} sm={24}>
          <FormCard className="card">
            <h1 className="green-underline">تسجيل الدخول</h1>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              className="form-wrapper"
              style={{ height: "fit-content" }}
              validateTrigger="onSubmit" // Only validate on submit
            >
              <FormInput
                label="البريد الإلكتروني"
                labelCol={{ span: 24 }}
                name="email"
                rules={emailValidationRules}
              />

              <FormInput
                inputType="password"
                label="كلمة السر"
                labelCol={{ span: 24 }}
                name="password"
                rules={passwordRules}
              />

              <Button type="primary" htmlType="submit" className="form-btn">
                دخول
              </Button>
              <span className="login-register">
                ليس لديك حساب؟
                <Link to="/signup">تسجيل جديد</Link>
              </span>
            </Form>
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
