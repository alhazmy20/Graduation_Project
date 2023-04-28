import { Button } from "antd";
import React, { useState } from "react";
import api from "../../../../data/axiosConfig";
import { displayMessage } from "../../../../util/helpers";

const ActivateInstitAccount = ({ record: { id, isActive } }) => {
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
      await api().put(`api/institutions/${id}/activation`, {
        isActive: reverseStatus,
      });
      setLoading(false);
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
        {btn_text(status)}
      </Button>
    </div>
  );
};

export default ActivateInstitAccount;
