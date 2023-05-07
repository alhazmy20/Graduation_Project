import { Button, Checkbox, Modal, notification } from "antd";
import React, { useState } from "react";
import axiosConfig from "../../../../util/axiosConfig";
import "./StudentAcceptProcedure.scss";
import { useRevalidator } from "react-router-dom";
import { useAuth } from "../../../../auth/useContext";

const StudentAcceptProcedure = ({ status, applicant_id, acceptStatusId, rejectStatusId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [loading, setLoading] = useState(false);
  const revalidator = useRevalidator();

  const auth = useAuth();
  const role = auth.user?.role;

  const ACCEPT_STATUS_ID = acceptStatusId;
  const REJECT_STATUS_ID = rejectStatusId;


  const showButton =
    (role === "Supervisor" && status === "بإنتظار موافقة المشرف الجامعي") ||
    (role === "Institution" && status === "بإنتظار موافقة المنشأة") ||
    (role === "Student" && status === "بإنتظار تأكيد الطالب");

  const handleStatus = async (id) => {
    console.log(id, applicant_id);
    try {
      setLoading(true);
      await axiosConfig().put(`api/applications/${applicant_id}`, {
        status_id: id || statusId,
      });
      setLoading(false);
      const procedure = (id || statusId) === ACCEPT_STATUS_ID ? "قبول" : "رفض";
      notification.success({
        message: `تم ${procedure} الطلب.`,
        description:'و تم تحديث حالة الطلب'
      });
      revalidator.revalidate(); //revalidate the data
      setModalOpen(false); // close the modal after successful API call
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
      {showButton && (
        <span className="btnContainer">
          <Button
            className="greenBtn"
            onClick={() => {
              handleAcceptOrReject(ACCEPT_STATUS_ID);
            }}
            disabled={loading && statusId === ACCEPT_STATUS_ID}
            loading={loading && statusId === ACCEPT_STATUS_ID} // Add loading prop based on the loading state and statusId value
          >
            قبول
          </Button>
          <Button
            className="redBtn"
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
                <span className="modalDetails">
                  <strong>
                    هل انت متأكد من {statusId === ACCEPT_STATUS_ID ? "قبولك" : "رفضك"} لهذا الطلب؟
                  </strong>
                </span>
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
