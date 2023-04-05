import { Button, Card, Form, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./InstProfile.scss";
import InstFormInputs from "../../../components/form/InstFormInputs";
import InstManagerFormInputs from "../../../components/form/InstManagerFormInputs";
import axios from "axios";
import Spinner from "../../../components/ui/Spinner/Spinner";
import ProfileImage from "../../../components/ui/ProfileImage/ProfileImage";

const InstProfile = () => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add new state

  useEffect(() => {
    axios
      .get("http://localhost:8000/institutions/1")
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "لقد حدث خطأ",
          description: "لقد حدث خطأ ما، الرجاء المحاولة مرة أخرى",
        });
      });
  }, []);

  const onFinish = async (values) => {
    console.log(formData);
    // message.success("تم تحديث البيانات بنجاح");
  };

  const onFormValuesChange = (changedValues, allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
      managerPhone: parseFloat(changedValues.managerPhone),
    }));
    setIsFormChanged(
      Object.keys(changedValues).some((key) => allValues[key] !== formData[key])
    );
  };

  if (!formData) {
    return <Spinner />;
  }

  return (
    <div className="institution-profile">
      <div className="profileImage">
        <ProfileImage />
        {/*<span className="name">شركة التقنيات الحديثة</span>*/}
      </div>
      <Card className="card">
        <Form
          form={form}
          onFinish={onFinish}
          className="form"
          initialValues={formData}
          onValuesChange={onFormValuesChange} // Call onFormValuesChange on form value change
        >
          <h1>بيانات المنشأة</h1>
          <InstFormInputs />
          <h1>بيانات المسؤول</h1>
          <InstManagerFormInputs />
          <Button
            type="primary"
            htmlType="submit"
            className="save-button"
            disabled={!isFormChanged} // Disable button if the form is not changed
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
