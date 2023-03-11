import React, { useState } from "react";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import "./InstSignup.scss";
import { Steps, Card, Form, Button } from "antd";
import { Link } from "react-router-dom";

const InstSignup = () => {
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
    confirmPassword: "",
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

  const handleNextStep = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = (values) => {
    console.log(formData);
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
      content: <StepOne />,
    },
    {
      title: "معلومات المسؤول",
      content: <StepTwo />,
    },
  ];

  return (
    <div className="instRegister">
      <Card className="card">
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
                style={{ backgroundColor: "#008374", width: "100px" }}
              >
                التالي
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#008374", width: "100px" }}
              >
                تسجيل
              </Button>
            )}
            {currentStep > 0 && (
              <Button
                type="text"
                style={{
                  margin: "0 8px",
                  color: "#008374",
                  fontWeight: "bolder",
                }}
                onClick={handlePrevStep}
              >
                العودة
              </Button>
            )}
          </div>
        </Form>
        <span>
          لديك حساب؟ <Link to='/login'>تسجيل الدخول</Link>
        </span>
      </Card>
    </div>
  );
};

export default InstSignup;
