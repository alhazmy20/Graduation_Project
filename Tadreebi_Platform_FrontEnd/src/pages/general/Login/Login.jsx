import "./Login.scss";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useContext, useState } from "react";
import Container from "../../../layouts/Container/Container";
import { AuthContext } from "../../../auth/useContext";
import { Link, useNavigate } from "react-router-dom";
import { UserRole, GetAllNews } from "../../../data/API.js";
import { useParams } from "react-router-dom";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { useForm } from "antd/es/form/Form";
import FormInput from "../../../components/form/FormInput";
import { emailValidationRules, passwordRules } from "../../../Validation/rules";
const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { email } = useParams();
  const { userRole, error } = UserRole(`http://localhost:8000/users`);
  console.log(userRole.map((data) => data.email));
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e) => {
  // try {
  //   if (userRole === "student") {
  //     await login(inputs);
  //     navigate("/TrainingOpportunities");
  //   } else if (userRole === "institution") {
  //     await login(inputs);
  //     navigate("/institution/");
  //   } else {
  //     navigate("/");
  //   }
  // } catch (err) {
  //   setError(err);
  // }

  //   navigate(`/login/${inputs.email}`);
  // };

  // const handleSubmit = async (e) => {
  //   try {
  //     console.log(inputs);
  //     await login(inputs);
  //     navigate("/");
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   const test = {
  //     username: "AAAAAA",
  //     email: "a@gmail.com",
  //     password: "aosejnfoiejaomcojasoiejfj",
  //   };

  //   try {
  //     // console.log(inputs);
  //     await login(test);
  //     if (
  //       test.email === "a@giml.com" &&
  //       test.password === "aosejnfoiejaomcojasoiejfj"
  //     ) {
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  const form = useForm();

  const handleSubmit = async (e) => {
    // const test = {
    //   username: "AAAAAA",
    //   email: "a@giml.com",
    //   password: "aosejnfoiejaomcojasoiejfj",
    // };
    // try {
    //   // console.log(inputs);
    //   await login(test);
    //   if (
    //     test.email === "a@giml.com" &&
    //     test.password === "aosejnfoiejaomcojasoiejfj"
    //   ) {
    //     navigate("/");
    //   }
    // } catch (err) {
    //   setError(err);
    // }
  };

  const onFinishFailed = (error) => {
    console.log("error", error);
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
              onFinishFailed={onFinishFailed}
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
