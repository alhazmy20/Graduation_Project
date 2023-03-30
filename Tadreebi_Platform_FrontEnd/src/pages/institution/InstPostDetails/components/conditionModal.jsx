import { Button, Modal } from "antd";
import React from "react";
import "./conditionModal.scss";

const ConditionModal = ({ modalOpen, setModalOpen, condition }) => {
  return (
    <Modal
      title="تنبيه:"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[]}
    >
      <div className="modalDetailsContainer">
        {(() => {
          if (condition === "accept") {
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
                  {" "}
                  في حال رفضك الطالب فأنه لا يمكنك ان تتراجع عن القرار و سيتم
                  اشعار الطالب بالرفض.
                </strong>
              </span>
            );
          }
        })()}
        <br />
        <br />
        <div className="btnsContainer">
          <Button className="Accept">
            <strong>تأكيد</strong>
          </Button>
          <Button className="Reject">
            <strong>الغاء</strong>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConditionModal;
