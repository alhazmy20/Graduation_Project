import React, { useState } from "react";
import "./InstSignup.scss";
import { Steps, Form, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import InstFormInputs from "../../../components/form/InstFormInputs";
import InstManagerFormInputs from "../../../components/form/InstManagerFormInputs";
import FormCard from '../../../components/ui/FormCard/FormCard';

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

  const onFinish = (values) => {
    console.log(formData);
    navigate("/verify-account");
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
      <FormCard className="card">
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
                className='main-btn'
              >
                التالي
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                className='main-btn'
              >
                تسجيل
              </Button>
            )}
            {currentStep > 0 && (
              <Button
                type="text"
                className='back-btn'
                onClick={handlePrevStep}
              >
                العودة
              </Button>
            )}
          </div>
        </Form>
        <span>
          لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>
        </span>
      </FormCard>
    </div>
  );
};

export default InstSignup;
