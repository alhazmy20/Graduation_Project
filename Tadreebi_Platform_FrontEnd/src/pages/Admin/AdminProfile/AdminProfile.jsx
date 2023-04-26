import React, { Suspense, useState } from "react";
import "./AdminProfile.scss";
import FormCard from "../../../components/ui/FormCard/FormCard";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import { Button, Col, Form, Row, notification } from "antd";
import FormInput from "../../../components/form/FormInput";
import { emailValidationRules, phoneRules } from "../../../Validation/rules";
import { useAuth } from "../../../auth/useContext";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import { getAdmin } from "../../../util/api";
import Spinner from "../../../components/ui/Spinner/Spinner";
import api from "../../../data/axiosConfig";

const AdminProfile = () => {
  const adminData = useLoaderData();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const auth = useAuth();

  const onFormValuesChange = (changedValues, allValues) => {
    setIsFormChanged(
      Object.keys(changedValues).some(
        (key) => allValues[key] !== adminData[key]
      )
    );
  };

  const onFinish = async (values) => {
    console.log(auth.user.id);
    try {
      setLoading(true);
      await api().put(`api/admins/${id || auth.user.id}`, values);
      notification.success({ message: "تم تحديث البيانات بنجاح" });
      setLoading(false);
      setIsFormChanged(false);
    } catch (error) {
      console.error(error);
      setLoading(false)
      notification.error({ message: "فشل تحديث البيانات" });
    }
  };

  return (
    <div className="admin-profile">
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={adminData?.admin}
          errorElement={<p>Error loading the data.</p>}
        >
          {(loaderData) => (
            <>
              <FormCard className="card">
                <h1 className="green-underline">بيانات المشرف</h1>
                <Form
                  onFinish={onFinish}
                  initialValues={loaderData}
                  onValuesChange={onFormValuesChange}
                >
                  <Row gutter={[16, 2]}>
                    <Col xs={24} sm={12}>
                      <FormInput
                        label="الإسم الأول"
                        labelCol={{ span: 24 }}
                        name="fName"
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <FormInput
                        label="الإسم الأخير"
                        labelCol={{ span: 24 }}
                        name="lName"
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <FormInput
                        label="البريد الإلكتروني"
                        labelCol={{ span: 24 }}
                        name="email"
                        rules={emailValidationRules}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <FormInput
                        label="رقم الجوال"
                        labelCol={{ span: 24 }}
                        name="phone"
                        inputType="number"
                        placeholder="05XXXXXXXX"
                        rules={phoneRules}
                      />
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="form-btn"
                    disabled={!isFormChanged} // Disable button if the form is not changed
                    loading={loading}
                  >
                    {loading ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                </Form>
              </FormCard>
              <ResetPassword id={loaderData.id}/>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default AdminProfile;

export const adminProfileLoader = () => {
  const admin = JSON.parse(localStorage.getItem("user"));
  return defer({ admin: getAdmin(admin.id) });
};

export const adminLoaderWithId = ({ params }) => {
  const adminId = params.id;
  return defer({ admin: getAdmin(adminId) });
};