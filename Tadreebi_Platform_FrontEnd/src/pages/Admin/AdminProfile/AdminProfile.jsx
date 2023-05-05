import React, { Suspense, useState } from "react";
import "./AdminProfile.scss";
import FormCard from "../../../components/ui/FormCard/FormCard";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import { Form, Row } from "antd";
import { useAuth } from "../../../auth/useContext";
import { Await, useLoaderData, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import axiosConfig from "../../../util/axiosConfig";
import AdminFormInputs from "../../../components/form/AdminFormInputs";
import SubmitButton from "../../../components/form/SubmitButton";
import { displayMessage } from "../../../util/helpers";

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
    try {
      setLoading(true);
      await axiosConfig().put(`api/admins/${id || auth.user.id}`, values);
      displayMessage("success", "تم تحديث البيانات بنجاح");
      setLoading(false);
      setIsFormChanged(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      displayMessage("error", "فشل تحديث البيانات");
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
                    <AdminFormInputs />
                  </Row>

                  <SubmitButton
                    disabled={!isFormChanged} // Disable button if the form is not changed
                    loading={loading}
                  >
                    {loading ? "جاري الحفظ..." : "حفظ"}
                  </SubmitButton>
                </Form>
              </FormCard>
              <ResetPassword id={loaderData.id} />
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default AdminProfile;
