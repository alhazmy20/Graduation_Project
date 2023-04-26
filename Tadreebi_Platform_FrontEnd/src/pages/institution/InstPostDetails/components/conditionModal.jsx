import { Button, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import "./conditionModal.scss";
import api from "../../../../data/axiosConfig";

const ConditionModal = ({
  modalOpen,
  setModalOpen,
  statusId,
  applicant_id,
  onOk,
}) => {
  const handleStatus = () => {
    try {
      api().put(`api/applications/${applicant_id}`, {
        status_id: statusId,
      });
      setModalOpen(false);
      onOk();
      const appStateAfterAction =
        statusId === "2" ? "بإنتظار تأكيد الطالب" : "مرفوض";
      notification.success({ message: "تم التقديم بنجاح." });
    } catch (error) {
      console.log(error);
      notification.error({ message: error.response.data.message });
    }
  };
  return (
    <Modal
      title="تنبيه:"
      className="modalContainer"
      open={modalOpen}
      onOk={handleStatus}
      onCancel={() => setModalOpen(false)}
    >
      <div className="modalDetailsContainer">
        {(() => {
          if (statusId === "2") {
            return (
              <span className="modalDetails">
                <strong>
                  في حال قبولك الطالب فأنه لا يمكنك ان تتراجع عن القرار و سيتم
                  اشعار الطالب بالقبول.
                </strong>
              </span>
            );
          } else {
            return (
              <span className="modalDetails">
                <strong>
                  في حال رفضك الطالب فأنه لا يمكنك ان تتراجع عن القرار و سيتم
                  اشعار الطالب بالرفض.
                </strong>
              </span>
            );
          }
        })()}
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default ConditionModal;
