import "./Login.scss";
import { Col, Form, Row, notification } from "antd";
import React, { useEffect } from "react";
import Container from "../../../layouts/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { useState } from "react";
import { useAuth } from "../../../auth/useContext";
import SubmitButton from "../../../components/form/SubmitButton";
import PasswordInput from "../../../components/form/PasswordInput";
import EmailInput from "../../../components/form/EmailInput";

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
      switch(auth.user.role){
        case "Admin" : navigate("/admin")
        break;
        case "SuperAdmin": navigate("/admin")
        break;
        case "Supervisor": navigate("/supervisor")
        break;
        default: navigate("/")
      }
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
              <EmailInput label="البريد الإلكتروني" />

              <PasswordInput label="كلمة السر" />

              <SubmitButton disabled={loading} loading={loading}>
                دخول
              </SubmitButton>

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
