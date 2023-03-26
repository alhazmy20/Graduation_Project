import { Button, Card, Form, notification } from "antd";
import React, { useEffect, useState } from "react";
import ResetPassword from "../../../components/ui/PasswordReset/PasswordReset";
import PictureCircle from "../../../components/ui/PictureCircle/PictureCircle";
import "./InstProfile.scss";
import axios from "axios";
import InstitutionData from "../../../components/form/InstitutionData ";
import InstManagerData from "../../../components/form/InstManagerData";

const InstProfile = () => {
  const [majors, setMajors] = useState();
  const [cities, setCities] = useState();

  const [formData, setFormData] = useState({
    institutionName: "شركة التقنيات الحديثة",
    institutionField: "",
    city: "",
    institutionSector: "",
    region: "منطقة المدينة المنورة",
    email: "",
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

  const onFinish = async (values) => {
    console.log(formData);
  };

  useEffect(() => {
    (async () => {
      try {
        const [majors, cities] = await Promise.all([
          axios.get("https://www.ptway.net/api/getspec?type=sMajor"),
          axios.get("https://www.ptway.net/api/getcity?type=city"),
        ]);

        setMajors(JSON.parse(majors.data.Cs));
        setCities(JSON.parse(cities.data.cities));
      } catch (error) {
        console.log("Opps, we got an error", error);

        notification.error({
          message: "لقد حدث خطأ",
          description: "لقد حدث خطأ ما، الرجاء المحاولة مرة أخرى",
        });
      }
    })();
  }, []);

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
          <Button type="primary" htmlType="submit" className="save-button">
            حفظ
          </Button>
        </Form>
      </Card>
      <ResetPassword />
    </div>
  );
};

export default InstProfile;
