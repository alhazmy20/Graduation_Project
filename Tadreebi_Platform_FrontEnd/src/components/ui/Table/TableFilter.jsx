import { Button } from "antd";
import React, { useState } from "react";
import ConditionModal from "../../../pages/institution/InstPostDetails/components/conditionModal";
import StudentModal from "../../../pages/institution/InstPostDetails/components/StudentModal";

export const TableText = (text) => {
  let style = {};
  if (text === "بإنتظار موافقة الطالب" || text === "بإنتظار موافقة المنشأة") {
    style.color = "#F9C068";
  } else if (text === "مرفوض") {
    style.color = "red";
  } else if (text === "مقبول") {
    style.color = "#008374b2";
  }
  return <span style={style}>{text}</span>;
};

export const AdminInstitutionText = (record) => {
  let buttons = {};
  if (record === "نشط") {
    buttons = <Button className="activeBtn">نشط</Button>;
  } else if (record === "غير نشط")
    buttons = <Button className="inactiveBtn">غير نشط</Button>;
  return buttons;
};

export const AdminStudentTable = (text) => {
  let style = {};
  if (text === "نشط") {
    style.color = "#008374b2";
  } else if (text === "غير نشط") {
    style.color = "red";
  }
  return <span style={style}>{text}</span>;
};

export function InstitutionAccept({ row }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [condition, setCondition] = useState("");

  if (row.status === "بإنتظار موافقة المنشأة") {
    return (
      <span className="btnContainer">
        <Button
          className="acceptBtn"
          onClick={() => {
            setModalOpen(true);
            setCondition("accept");
          }}
        >
          قبول
        </Button>
        <Button
          className="rejectBtn"
          onClick={() => {
            setModalOpen(true);
            setCondition("reject");
          }}
        >
          رفض
        </Button>
        <ConditionModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          condition={condition}
        />
      </span>
    );
  } else {
    return <span>-</span>;
  }
}

export function StudentDetails({ name, id }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <span>
      {
        <Button
          type="text"
          className="row-title"
          onClick={() => {
            setDetailsOpen(true);
          }}
        >
          {name}
        </Button>
      }
      <StudentModal setDetailsOpen={setDetailsOpen} detailsOpen={detailsOpen} id={id}/>
    </span>
  );
}
