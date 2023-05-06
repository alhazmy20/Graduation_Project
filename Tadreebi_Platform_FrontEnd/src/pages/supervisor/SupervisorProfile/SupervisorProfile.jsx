import React, { Suspense, useState } from "react";
import "./SupervisorProfile.scss";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { Await,  useLoaderData, useParams } from "react-router-dom";
import { Col, Form, Row } from "antd";
import { useAuth } from "../../../auth/useContext";
import EmailInput from "../../../components/form/EmailInput";
import UniversitySelect from "../../../components/form/UniversitySelect";
import FormInput from "../../../components/form/FormInput";
import Spinner from "../../../components/ui/Spinner/Spinner";
import SubmitButton from "../../../components/form/SubmitButton";
import FormSelect from "../../../components/form/FormSelect";
import axiosConfig from '../../../util/axiosConfig'
import { displayMessage } from '../../../util/helpers';
import ResetPassword from '../../../components/form/PasswordReset/PasswordReset';

const SupervisorProfile = ({isAdmin}) => {
  const supervisorData = useLoaderData();

  const { id } = useParams();
  const auth = useAuth();

  const options = [
    {
      value: "0",
      label: "الطلاب",
    },
    {
      value: "1",
      label: "الطالبات",
    },
    {
      value: "2",
      label: "الكل",
    },
  ];

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFormValuesChange = (changedValues, allValues) => {
    setIsFormChanged(
      Object.keys(changedValues).some(
        (key) => allValues[key] !== supervisorData[key]
      )
    );
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axiosConfig().put(`api/supervisors/${id || auth.user.id}`, values);
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
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={supervisorData?.supervisor}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="supervisor-profile">
            <FormCard className="card">
              <h1 className="green-underline">بيانات مشرف الجامعة</h1>
              <Form
                onFinish={onFinish}
                initialValues={loadedData}
                onValuesChange={onFormValuesChange}
              >
                <Row gutter={[16, 2]}>
                  <Col xs={24} sm={12}>
                    <EmailInput label="البريد الجامعي" />
                  </Col>
                  <Col xs={24} sm={12}>
                    <UniversitySelect label="الجامعة" />
                  </Col>
                  <Col xs={24} sm={12}>
                    <FormInput name="college" label="الكلية" />
                  </Col>
                  <Col xs={24} sm={12}>
                    <FormInput name="department" label="القسم" />
                  </Col>
                  <Col xs={24} sm={12}>
                    <FormSelect
                      label="الشطر"
                      name="section"
                      options={options}
                    />
                  </Col>
                </Row>
                <SubmitButton
                  disabled={!isFormChanged} // Disable button if the form is not changed
                  loading={loading}
                >
                  {loading ? "جاري الحفظ..." : "حفظ"}
                </SubmitButton>
              </Form>
            </FormCard>
            {!isAdmin && <ResetPassword />}
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default SupervisorProfile;
