import "./Login.scss";
import { Button, Col, Form, Row, notification } from "antd";
import React, { useEffect } from "react";
import Container from "../../../layouts/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import FormCard from "../../../components/ui/FormCard/FormCard";
import FormInput from "../../../components/form/FormInput";
import { emailValidationRules, passwordRules } from "../../../Validation/rules";
import { useState } from "react";
import { useAuth } from "../../../auth/useContext";

const Login = ({ isAdmin }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await auth.login(values);
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message;
      notification.error({
        message: "خطأ في تسجيل الدخول",
        description: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (auth.user) {
      navigate(auth.user.role === 'Admin' ? "/admin" : "/");
    }
  }, [auth, navigate, isAdmin]);

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

              <Button
                type="primary"
                htmlType="submit"
                className="form-btn"
                disabled={loading}
              >
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
