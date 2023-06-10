import { Button } from "antd";
import React, { useState } from "react";
import StudentModal from "../StudentModal/StudentModal";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const TableText = ({ text }) => {
  let style = {};
  if (
    text === "بإنتظار تأكيد الطالب" ||
    text === "بإنتظار موافقة المنشأة" ||
    text === "بإنتظار موافقة المشرف الجامعي"
  ) {
    style.color = "#F9C068";
  } else if (
    text === "تم الرفض من قبل المنشأة" ||
    text === "تم الرفض من قبل المشرف الجامعي" ||
    text === "تم الرفض من قبل الطالب" ||
    text === 'تم الغاء الطلب من قبل النظام'
  ) {
    style.color = "red";
  } else if (text === "مقبول") {
    style.color = "#008374b2";
  }
  return <span style={style}>{text}</span>;
};


export const StatusText = (text) => {
  return (
    <span className={text === "نشط" ? "activeStat" : "inactiveStat"}>
      {text}
    </span>
  );
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

export const InstPostsText = (text) => {
  let style = {};
  if (text === "نشط") {
    style.color = "#008374b2";
  } else if (text === "مغلق") {
    style.color = "red";
  }
  return <span style={style}>{text}</span>;
};

export function StudentDetails({ name, data,isSupervisor }) {
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
        <StudentModal
          setDetailsOpen={setDetailsOpen}
          detailsOpen={detailsOpen}
          data={data}
          isSupervisor={isSupervisor}
        />
    </span>
  );
}

export function Edit({ record, endPoint_1, endPoint_2 }) {
  return (
    <span>
      <Link to={`/${endPoint_1}/${endPoint_2}/${record.id}`}>
        {
          <FontAwesomeIcon
            className="icon"
            icon={faPenToSquare}
            style={{ color: "#008374b2" }}
          />
        }
      </Link>
    </span>
  );
}

export function InstTitle({ text, record }) {
  return (
    <span>
      <Link className="row-title" to={`/institution/posts/${record.id}`}>
        {text}
      </Link>
    </span>
  );
}

export const StudentAccept = ({ status }) => {
  if (status === "بإنتظار تأكيد الطالب") {
    return (
      <span className="btnContainer">
        {<Button className="acceptBtn">قبول</Button>}
        {<Button className="rejectBtn">رفض</Button>}
      </span>
    );
  } else return <span>-</span>;
};
