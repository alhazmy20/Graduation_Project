import React, { useState } from "react";
import "./InstSignup.scss";
import { Steps, Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import InstFormInputs from "../InstFormInputs";
import InstManagerFormInputs from "../InstManagerFormInputs";
import axios from "axios";
import api from "../../../data/testApi";

const InstSignup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    institutionName: "",
    institutionField: "",
    city: "",
    institutionSector: "",
    region: "",
    email: "",
    password: "",
    password_confirmation: "",
    fName: "",
    lName: "",
    managerEmail: "",
    managerPosition: "",
    managerPhone: "",
    institutionPhone: "",
  });

  const handleFormChange = (changedValues, allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
  };

  const handleNextStep = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async (values) => {
    console.log(formData);
    api(true)
      .get("/sanctum/csrf-cookie")
      // .then(() => {
      //   api()
      //     .post("http://165.227.159.49/api/institutions", formData)
      //     .then((postResponse) => {
      //       console.log(postResponse.data);
      //       navigate("/verify-account");
      //     })
          .catch((error) => {
            message.error(error.response.data.message);
            console.log(error.response.data.message);
          });
      // });
  };

  const isStepDisabled = (stepNumber) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return formData === null;
    }
  };

  const steps = [
    {
      title: "معلومات المنشأة",
      content: <InstFormInputs withPassword={true} />,
    },
    {
      title: "معلومات المسؤول",
      content: <InstManagerFormInputs />,
    },
  ];

  return (
    <div className="instRegister">
      <Form
        form={form}
        onValuesChange={handleFormChange}
        onFinish={onFinish}
        className="form"
      >
        <Steps current={currentStep} status="process" className="steps">
          {steps.map((item) => (
            <Steps.Step
              disabled={isStepDisabled(currentStep)}
              key={item.title}
              title={item.title}
            />
          ))}
        </Steps>
        <div className="steps-content">{steps[currentStep].content}</div>
        <div className="steps-action">
          {currentStep < steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleNextStep}
              className="main-btn"
            >
              التالي
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit" className="main-btn">
              تسجيل
            </Button>
          )}
          {currentStep > 0 && (
            <Button type="text" className="back-btn" onClick={handlePrevStep}>
              العودة
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default InstSignup;