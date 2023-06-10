import React, { useState } from "react";
import "./InstSignup.scss";
import { Steps, Form, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import InstFormInputs from "../../../components/form/InstFormInputs";
import InstManagerFormInputs from "../../../components/form/InstManagerFormInputs";
import axiosConfig from "../../../util/axiosConfig";
import secureLocalStorage from "react-secure-storage";
import SubmitButton from '../../../components/form/SubmitButton';

const InstSignup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

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
    axiosConfig()
      .get("/api/csrf-token")
      .then((response) => {
        setLoading(true);
        const csrfToken = response.data.data.csrf_token;
        secureLocalStorage.setItem("csrf_token", csrfToken);
      })
      .then(() => {
        axiosConfig()
          .post("/api/institutions", formData)
          .then((postResponse) => {
            navigate("/verify-account");
          })
          .catch((error) => {
            setLoading(false);
            const errors = error.response.data.errors;

            notification.error({
              message: "خطأ في تسجيل الدخول",
              description: Object.keys(errors).map((key) => errors[key][0]).join(","),
            });
          });
      });
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
            <SubmitButton
              className="main-btn"
              loading={loading}
              disabled={loading}
            >
            {loading ? "جاري التسجيل..." : "تسجيل"}
            </SubmitButton>
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
