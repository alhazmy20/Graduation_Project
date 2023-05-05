import { Col, Form, Row, notification } from "antd";
import React, { useState } from "react";
import "./PasswordReset.scss";
import FormCard from "../../ui/FormCard/FormCard";
import axiosConfig from "../../../util/axiosConfig";
import { useAuth } from "../../../auth/useContext";
import PasswordInput from "../PasswordInput";
import PasswordConfirInput from "../PasswordConfirInput";
import SubmitButton from "../SubmitButton";

const ResetPassword = () => {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axiosConfig().post(
        `api/user/${auth.user.id}/change-password`,
        values
      );
      notification.success({ message: "تم تحديث كلمة السر بنجاح" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({ message: error.response.data.message });
    }
  };

  return (
    <div className="reset-password">
      <FormCard className="card">
        <h1 className="green-underline">تحديث كلمة السر</h1>
        <Form onFinish={onFinish} className="form">
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <PasswordInput label="كلمة السر الحالية" name="old_password" />
            </Col>
            <Col xs={24} sm={12}>
              <PasswordInput label="كلمة السر الجديدة" />
            </Col>
            <Col xs={24} sm={12}>
              <PasswordConfirInput
                label="تأكيد كلمة السر الجديدة"
                name="password_confirmation"
              />
            </Col>
          </Row>

          <SubmitButton loading={loading} disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ"}
          </SubmitButton>
        </Form>
      </FormCard>
    </div>
  );
};

export default ResetPassword;
