import React, { Suspense, useState } from "react";
import "./SupervisorProfile.scss";
import FormCard from "../../../components/ui/FormCard/FormCard";
import {
  Await,
  defer,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import api from "../../../data/axiosConfig";
import { displayMessage } from "../../../util/helpers";
import { Col, Form, Row } from "antd";
import { useAuth } from "../../../auth/useContext";
import EmailInput from "../../../components/form/EmailInput";
import UniversitySelect from "../../../components/form/UniversitySelect";
import FormInput from "../../../components/form/FormInput";
import { getSupervisor } from "../../../util/api";
import Spinner from "../../../components/ui/Spinner/Spinner";
import SubmitButton from '../../../components/form/SubmitButton';

const SupervisorProfile = () => {
  const supervisorData = useLoaderData();

  const { id } = useParams();
  const auth = useAuth();

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
      await api().put(`api/supervisors/${id || auth.user.id}`, values);
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
                </Row>
                <SubmitButton
                disabled={!isFormChanged} // Disable button if the form is not changed
                loading={loading}
              >
                {loading ? "جاري الحفظ..." : "حفظ"}
              </SubmitButton>
              </Form>
            </FormCard>
          </div>
          )}
          </Await>
        </Suspense>
  );
};

export default SupervisorProfile;

export const supervisorProfileLoader = () => {
  const supervisor = JSON.parse(localStorage.getItem("user"));
  return defer({ supervisor: getSupervisor(supervisor.id) });
};

export const supervisorLoaderWithId = ({ params }) => {
  const supervisorId = params.id;
  return defer({ supervisor: getSupervisor(supervisorId) });
};
