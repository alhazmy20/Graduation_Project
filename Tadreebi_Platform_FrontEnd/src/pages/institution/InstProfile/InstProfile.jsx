import { Button, Form, notification } from "antd";
import React, { Suspense, useState } from "react";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./InstProfile.scss";
import InstFormInputs from "../../../components/form/InstFormInputs";
import InstManagerFormInputs from "../../../components/form/InstManagerFormInputs";
import Spinner from "../../../components/ui/Spinner/Spinner";
import ProfileImage from "../../../components/ui/ProfileImage/ProfileImage";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import api from "../../../data/axiosConfig";
import { getInstitution } from "../../../util/api";
import { useAuth } from "../../../auth/useContext";
import loca from "react-secure-storage";

const InstProfile = ({ isAdmin }) => {
  const { id } = useParams();
  const auth = useAuth();
  const institutionData = useLoaderData();

  const [formData, setFormData] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFormValuesChange = (changedValues, allValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...allValues,
      managerPhone: parseFloat(changedValues.managerPhone),
    }));
    setIsFormChanged(
      Object.keys(changedValues).some(
        (key) => allValues[key] !== institutionData[key]
      )
    );
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await api().put(`api/institutions/${id || auth.user.id}`, values);
      notification.success({ message: "تم تحديث البيانات بنجاح" });
      setLoading(false);
      setIsFormChanged(false);
    } catch (error) {
      setLoading(false)
      notification.error({ message: "فشل تحديث البيانات" });
    }
  };

  return (
    <div className="institution-profile">
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={institutionData?.institution}
          errorElement={<p>Error loading the data.</p>}
        >
          {(loadedData) => (
            <>
              <div className="profileImage">
                <ProfileImage
                  name={loadedData.institutionName}
                  personalPicture_url={loadedData.logo?.logo_url}
                  id={id}
                  userType="institutions"
                />
              </div>
              <FormCard className="card">
                <Form
                  onFinish={onFinish}
                  className="form"
                  initialValues={loadedData}
                  onValuesChange={onFormValuesChange} // Call onFormValuesChange on form value change
                >
                  <h1 className="green-underline">بيانات المنشأة</h1>
                  <InstFormInputs region={loadedData.region} />
                  <h1 className="green-underline">بيانات المسؤول</h1>
                  <InstManagerFormInputs />
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
              {!isAdmin && <ResetPassword />}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default InstProfile;

export const institutionLoaderWithId = ({ params }) => {
  const instId = params.id;
  return defer({ institution: getInstitution(instId) });
};

export const institutionLoader = () => {
  const institution = JSON.parse(localStorage.getItem("user"));
  return defer({ institution: getInstitution(institution.id) });
};
