import { Button, Card, Form, message } from "antd";
import React, { useState } from "react";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import PictureCircle from "../../../components/ui/PictureCircle/PictureCircle";
import "./InstProfile.scss";
import InstitutionData from "../../../components/form/InstitutionData ";
import InstManagerData from "../../../components/form/InstManagerData";

const InstProfile = () => {
  const [formData, setFormData] = useState({
    institutionName: "شركة التقنيات الحديثة",
    institutionField: "",
    city: "",
    institutionSector: "قطاع حكومي",
    region: "منطقة المدينة المنورة",
    email: "",
    fName: "",
    lName: "",
    managerEmail: "",
    managerPosition: "",
    managerPhone: "",
  });
  const [formInitialValues, setFormInitialValues] = useState(formData);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add new state

  const handleFormChange = (changedValues, allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
    }));
  };

  const onFinish = async (values) => {
    setIsSubmitting(true); // Set isSubmitting to true before submitting the form
    console.log(formData);
    setTimeout(() => {
      setIsSubmitting(false); // Set isSubmitting to false after submitting the form
    }, 2000);
    setFormInitialValues(formData);
    message.success("تم تحديث البيانات بنجاح");
  };

  let isButtonDisabled =
    JSON.stringify(formData) === JSON.stringify(formInitialValues);

  return (
    <div className="institution-profile">
      <div className="profileImage">
        <PictureCircle />
        <span className="name">شركة التقنيات الحديثة</span>
      </div>
      <Card className="card">
        <Form
          onValuesChange={handleFormChange}
          onFinish={onFinish}
          className="form"
          initialValues={formData}
        >
          <h1>بيانات المنشأة</h1>
          <InstitutionData />
          <h1>بيانات المسؤول</h1>
          <InstManagerData />
          <Button
            type="primary"
            htmlType="submit"
            className="save-button"
            disabled={isButtonDisabled}
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </Form>
      </Card>
      <ResetPassword />
    </div>
  );
};

export default InstProfile;
