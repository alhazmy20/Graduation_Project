import { Button, Card, Form, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./InstProfile.scss";
import InstFormInputs from "../../../components/form/InstFormInputs";
import InstManagerFormInputs from "../../../components/form/InstManagerFormInputs";
import axios from "axios";
import Spinner from "../../../components/ui/Spinner/Spinner";
import ProfileImage from "../../../components/ui/ProfileImage/ProfileImage";
import FormCard from '../../../components/ui/FormCard/FormCard';
import { useFetch } from '../../../data/API';

const InstProfile = ({isAdmin}) => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const { data, loading, error } = useFetch("http://localhost:8000/institutions/1");

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error({
      message: "لقد حدث خطأ",
      description: "لقد حدث خطأ ما، الرجاء المحاولة مرة أخرى",
    });
  }

  const onFormValuesChange = (changedValues, allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
      managerPhone: parseFloat(changedValues.managerPhone),
    }));
    setIsFormChanged(
      Object.keys(changedValues).some((key) => allValues[key] !== data[key])
    );
  };

  const onFinish = async (values) => {
    console.log(values);
    setIsSubmitting(true)
   
    // message.success("تم تحديث البيانات بنجاح");
  };


  return (
    <div className="institution-profile">
      <div className="profileImage">
        <ProfileImage name={data.institutionName} />
      </div>
      <FormCard className="card">
        <Form
          form={form}
          onFinish={onFinish}
          className="form"
          initialValues={data}
          onValuesChange={onFormValuesChange} // Call onFormValuesChange on form value change
        >
          <h1>بيانات المنشأة</h1>
          <InstFormInputs region={data.region}/>
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
      </FormCard>
      {!isAdmin && <ResetPassword />}
    </div>
  );
};

export default InstProfile;
