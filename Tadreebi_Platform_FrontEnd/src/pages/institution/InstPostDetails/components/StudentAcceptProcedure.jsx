import { Button, Checkbox, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../data/axiosConfig";
import "./StudentAcceptProcedure.scss";

const StudentAcceptProcedure = ({ status, applicant_id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [showBtnContainer, setShowBtnContainer] = useState(true);
  const [loading, setLoading] = useState(false);

  const ACCEPT_STATUS_ID = "2";
  const REJECT_STATUS_ID = "4";

  const handleStatus = async (id) => {
    try {
      setLoading(true);
      await api().put(`api/applications/${applicant_id}`, {
        status_id: id || statusId,
      });
      setLoading(false);
      setShowBtnContainer(false);
      const procedure = (id || statusId) === ACCEPT_STATUS_ID ? "قبول" : "رفض";
      notification.success({
        message: `تم ${procedure} الطالب و سيتم اشعاره بذلك.`,
      });
      // close the modal after successful API call
      setModalOpen(false);
    } catch (error) {
      notification.error({ message: error.response.data.message });
    }
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      //Do not show the modal for 24 hours
      const hideModalUntil = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      localStorage.setItem("hideModalUntil", hideModalUntil);
    } else {
      localStorage.removeItem("hideModalUntil");
    }
  };

  const handleAcceptOrReject = (status_id) => {
    setStatusId(status_id);
    if (Date.now() < parseInt(localStorage.getItem("hideModalUntil"))) {
      handleStatus(status_id);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="student-accept-procedure">
      {status === "بإنتظار موافقة المنشأة" && showBtnContainer && (
        <span className="btnContainer">
          <Button
            className="acceptBtn"
            onClick={() => {
              handleAcceptOrReject(ACCEPT_STATUS_ID);
            }}
            disabled={loading && statusId === ACCEPT_STATUS_ID}
            loading={loading && statusId === ACCEPT_STATUS_ID} // Add loading prop based on the loading state and statusId value
          >
            قبول
          </Button>
          <Button
            className="rejectBtn"
            onClick={() => {
              handleAcceptOrReject(REJECT_STATUS_ID);
            }}
            disabled={loading && statusId === REJECT_STATUS_ID}
            loading={loading && statusId === REJECT_STATUS_ID} // Add loading prop based on the loading state and statusId value
          >
            رفض
          </Button>
        </span>
      )}

      <Modal
        title="تنبيه:"
        className="student-accept-modal"
        open={modalOpen}
        onOk={() => handleStatus(statusId)}
        onCancel={() => setModalOpen(false)}
        okText="تأكيد"
        cancelText="إلغاء"
        confirmLoading={loading} // Add confirmLoading prop to show loading state during API call
      >
        <div className="modalDetailsContainer">
          {(() => {
            if (statusId === ACCEPT_STATUS_ID) {
              return (
                <span className="modalDetails">
                  <strong>
                    في حال قبولك للطالب فأنه لا يمكنك ان تتراجع عن القرار و سيتم
                    اشعار الطالب بالقبول.
                  </strong>
                </span>
              );
            } else {
              return (
                <span className="modalDetails">
                  <strong>
                    في حال رفضك للطالب فأنه لا يمكنك ان تتراجع عن القرار و سيتم
                    اشعار الطالب بالرفض.
                  </strong>
                </span>
              );
            }
          })()}
          <Checkbox
            onChange={handleCheckboxChange}
            className="dont-show-checkbox"
          >
            لا تظهر هذا التنبيه لمدة يوم واحد
          </Checkbox>
        </div>
      </Modal>
    </div>
  );
};

export default StudentAcceptProcedure;
