import "./Login.scss";
import { Button, Col, Form, Input, notification, Row } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Container from "../../../layouts/Container/Container";

const Login = () => {
  const history = [];

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      const { data } = await axios.post("/adminLogin", { email, password });

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        history.push("/admin/home");

        return;
      }

      notification.error({
        message: "خطأ في البيانات",
        description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
      console.log(data);
    } catch (error) {
      console.log("Opps, we got an error", error);
    }
  };

  const onFinishFailed = (error) => {
    console.log("error", error);
  };

  return (
    <Container className="login-container">
      <Row justify="center" align="middle" className="login">
        <Col lg={10} md={18} xs={24} sm={24}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="form-wrapper"
            style={{ height: "fit-content" }}
          >
            <label className="label">البريد الالكتروني</label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "الرجاء ادخال البريد الإلكتروني" },
                { message: "الرجاء إدخال بريد الكتروني صالح", type: "email" },
              ]}
            >
              <Input />
            </Form.Item>
            <label className="label">كلمة المرور</label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "الرجاء ادخال كلمة المرور" },
                { message: "يجب أن يكون 8 احرف على الأقل", pattern: "^.{8,}$" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="login-button">
              دخول
            </Button>
            <span>
              ليس لديك حساب؟ <Link>حساب جديد</Link>
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
