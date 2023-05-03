import React, { useState } from "react";
import "./AddAdmin.scss";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { Form, Row, notification } from "antd";
import api from "../../../data/axiosConfig";
import { useNavigate } from "react-router-dom";
import AdminFormInputs from "../../../components/form/AdminFormInputs";
import SubmitButton from "../../../components/form/SubmitButton";

const AddAdmin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await api().post(`api/admins`, values);
      setLoading(false);
      navigate("/admin/manage-admins");
    } catch (error) {
      setLoading(false);
      console.log(error);
      notification.error({ message: error.data.response.message });
    }
  };

  return (
    <div className="add-admin">
      <FormCard className="card">
        <h1 className="green-underline">اضافة مشرف</h1>
        <Form onFinish={onFinish}>
          <Row gutter={[16, 2]}>
            <AdminFormInputs withPassword={true} />
          </Row>
          <SubmitButton disabled={loading} loading={loading}>
            {loading ? "جاري الإضافة..." : "اضافة"}
          </SubmitButton>
        </Form>
      </FormCard>
    </div>
  );
};

export default AddAdmin;
