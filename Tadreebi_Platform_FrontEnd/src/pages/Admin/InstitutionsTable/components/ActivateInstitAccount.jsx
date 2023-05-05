import { Button } from "antd";
import React, { useState } from "react";
import axiosConfig from "../../../../util/axiosConfig";
import { displayMessage } from "../../../../util/helpers";
import { useRevalidator } from "react-router-dom";

const ActivateInstitAccount = ({ record: { id, isActive } }) => {
  let revalidator = useRevalidator();

  // destructuring
  const [status, setStatus] = useState(isActive);
  const [reverseStatus, setReverseStatus] = useState(status === 0 ? 1 : 0);
  const [loading, setLoading] = useState(false);

  const btn_text = (status_id) => (status_id === 0 ? "غير نشط" : "نشط");

  const message_text = (status_id) =>
    status_id === 0 ? "الغاء تنشيط" : "تنشيط";

  const handleActivation = async () => {
    try {
      setLoading(true);
      // send PUT request to API to activate/inactivate institution account
      // use reverseStatus as the new value for isActive
      await axiosConfig().put(`api/institutions/${id}/activation`, {
        isActive: reverseStatus,
      });
      setLoading(false);
      revalidator.revalidate(); //revalidate the data
      displayMessage(
        "success",
        `تم ${message_text(reverseStatus)} حساب المؤسسة`
      );
      setStatus(reverseStatus); // update status state with reverseStatus
      setReverseStatus(status); // update reverseStatus state with previous value of status
    } catch (error) {
      setLoading(false);
      displayMessage(
        "error",
        `خطأ، لم يتم ${message_text(reverseStatus)} حساب المؤسسة`
      );
    }
  };

  return (
    <div>
      <Button
        className={status === 0 ? "inactiveBtn" : "activeBtn"}
        onClick={handleActivation}
        disabled={loading}
        loading={loading}
      >
        {btn_text(isActive)}
      </Button>
    </div>
  );
};

export default ActivateInstitAccount;
