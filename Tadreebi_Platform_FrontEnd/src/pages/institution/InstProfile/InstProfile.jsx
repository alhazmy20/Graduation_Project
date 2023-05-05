import { Form } from "antd";
import React, { Suspense, useState } from "react";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./InstProfile.scss";
import InstFormInputs from "../../../components/form/InstFormInputs";
import InstManagerFormInputs from "../../../components/form/InstManagerFormInputs";
import Spinner from "../../../components/ui/Spinner/Spinner";
import ProfileImage from "../../../components/ui/ProfileImage/ProfileImage";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { Await, useLoaderData, useParams } from "react-router-dom";
import axiosConfig from "../../../util/axiosConfig";
import { useAuth } from "../../../auth/useContext";
import SubmitButton from "../../../components/form/SubmitButton";
import { displayMessage } from "../../../util/helpers";

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
      await axiosConfig().put(`api/institutions/${id || auth.user.id}`, values);
      displayMessage("success", "تم تحديث البيانات بنجاح");
      setLoading(false);
      setIsFormChanged(false);
    } catch (error) {
      setLoading(false);
      displayMessage("error", "فشل تحديث البيانات");
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

                  <SubmitButton
                    disabled={!isFormChanged} // Disable button if the form is not changed
                    loading={loading}
                  >
                    {loading ? "جاري الحفظ..." : "حفظ"}
                  </SubmitButton>
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
