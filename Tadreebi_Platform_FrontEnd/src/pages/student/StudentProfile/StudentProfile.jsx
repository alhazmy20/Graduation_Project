import { Form } from "antd";
import React, { useState, Suspense } from "react";
import ResetPassword from "../../../components/form/PasswordReset/PasswordReset";
import "./StudentProfile.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";
import ProfileImage from "../../../components/ui/ProfileImage/ProfileImage";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { useAuth } from "../../../auth/useContext";
import { Await, useLoaderData, useParams } from "react-router-dom";
import axiosConfig from "../../../util/axiosConfig";
import StudentProfileInputs from "../../../components/form/StudentProfileInputs";
import { displayMessage } from "../../../util/helpers";
import SubmitButton from "../../../components/form/SubmitButton";

const StudentProfile = ({ isAdmin }) => {
  const studentData = useLoaderData();

  const { id } = useParams();
  const auth = useAuth();

  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    let { fullName, gender, ...others } = values;
    if (gender === ("ذكر" || "أنثى")) {
      gender = gender === "ذكر" ? 0 : 1;
    }
    const name = extractFullName(fullName);
    values = { gender, ...name, ...others };

    let formData = new FormData();
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        if (
          key === "transcript" ||
          key === "internshipLetter" ||
          key === "nationalID" ||
          key === "CV"
        ) {
          if (values[key]?.file) {
            formData.append(key, values[key]?.file);
          }
        } else {
          formData.append(key, values[key]);
        }
      }
    }
    try {
      setLoading(true);
      await axiosConfig().post(
        `api/students/${id || auth.user.id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      displayMessage("success", "تم تحديث البيانات بنجاح");
      setLoading(false);
      setIsFormChanged(false);
    } catch (error) {
      displayMessage("error", error?.response?.data?.message);
    }
    formData = new FormData();
  };

  const onFormValuesChange = (changedValues, allValues) => {
    setIsFormChanged(
      Object.keys(changedValues).some(
        (key) => allValues[key] !== studentData[key]
      )
    );
  };

  const extractName = (fullName) => {
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `${firstName} ${lastName}`;
  };

  const extractFullName = (fullName) => {
    const nameParts = fullName.split(" ");
    const individualNames = {
      fName: nameParts[0],
      sName: nameParts[1],
      tName: nameParts[2],
      lName: nameParts[3],
    };
    return individualNames;
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={studentData?.student}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="student-profile">
            <div className="profileImage">
              <ProfileImage
                name={extractName(loadedData.fullName)}
                personalPicture_url={
                  loadedData.studentFiles.personalPicture_url
                }
                userType="students"
                id={loadedData?.id}
              />
            </div>
            <FormCard className="card">
              <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={onFormValuesChange}
                className="form"
                encType="multipart/form-data"
                initialValues={loadedData}
              >
                <StudentProfileInputs
                  isAdmin={isAdmin}
                  loadedData={loadedData}
                />
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

export default StudentProfile;

// export const studentLoaderWithId = ({ params }) => {
//   const instId = params.id;
//   return defer({ student: getStudent(instId) });
// };

// export const studentLoader = () => {
//   const student = JSON.parse(secureLocalStorage.getItem("user"));
//   return defer({ student: getStudent(student?.id) });
// };
