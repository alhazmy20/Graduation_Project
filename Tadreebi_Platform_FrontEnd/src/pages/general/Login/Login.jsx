import "./Login.scss";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useContext, useState } from "react";
import Container from "../../../layouts/Container/Container";
import RegisterModal from "../RegisterModal/RegisterModal";
import { AuthContext } from "../../../auth/useContext";
import { useNavigate } from "react-router-dom";
import { UserRole, GetAllNews } from "../../../data/API.js";
import { useParams } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    const test = {
      username: "AAAAAA",
      email: "a@giml.com",
      password: "aosejnfoiejaomcojasoiejfj",
    };

    try {
      // console.log(inputs);
      await login(test);
      if (
        test.email === "a@giml.com" &&
        test.password === "aosejnfoiejaomcojasoiejfj"
      ) {
        navigate("/");
      }
    } catch (err) {
      setError(err);
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
            onFinish={handleSubmit}
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
              <Input name="email" onChange={handleChange} />
            </Form.Item>
            <label className="label">كلمة المرور</label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "الرجاء ادخال كلمة المرور" },
                { message: "يجب أن يكون 8 احرف على الأقل", pattern: "^.{8,}$" },
              ]}
            >
              <Input.Password name="password" onChange={handleChange} />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="login-button">
              دخول
            </Button>
            <span>
              ليس لديك حساب؟
              <Button
                type="link"
                style={{ padding: "0" }}
                onClick={() => setIsModalOpen(true)}
              >
                حساب جديد
              </Button>
              <RegisterModal
                modalOpen={isModalOpen}
                setModalOpen={setIsModalOpen}
              />
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
