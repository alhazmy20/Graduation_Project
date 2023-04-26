import { Button } from "antd";
import React, { useEffect, useState } from "react";
import ConditionModal from "../../../pages/institution/InstPostDetails/components/conditionModal";
import StudentModal from "../../../pages/institution/InstPostDetails/components/StudentModal";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const TableText = ({ text }) => {

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

export const StatusText = (record) => {
  let buttons = {};
  if (record === 1) {
    buttons = <Button className="activeBtn">نشط</Button>;
  } else if (record === 0)
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

export const InstPostsText = (text) => {
  let style = {};
  if (text === "نشط") {
    style.color = "#008374b2";
  } else if (text === "مغلق") {
    style.color = "red";
  }
  return <span style={style}>{text}</span>;
};

export function InstitutionAccept({ status, applicant_id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusId, setStatusId] = useState("");
  const [showBtnContainer, setShowBtnContainer] = useState(true); // new state variable

  if (status === "بإنتظار موافقة المنشأة") {
    return (
      <>
        {showBtnContainer && ( // render the btnContainer only if showBtnContainer is true
          <span className="btnContainer">
            <Button
              className="acceptBtn"
              onClick={() => {
                setModalOpen(true);
                setStatusId("2");
              }}
            >
              قبول
            </Button>
            <Button
              className="rejectBtn"
              onClick={() => {
                setModalOpen(true);
                setStatusId("4");
              }}
            >
              رفض
            </Button>
          </span>
        )}
        <ConditionModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          statusId={statusId}
          applicant_id={applicant_id}
          onOk={() => {
            setShowBtnContainer(false);
          }} // set showBtnContainer to false when ok button is clicked
        />
      </>
    );
  } else {
    return <span>-</span>;
  }
}

export function StudentDetails({ name, data }) {
  console.log(data);
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
      {/*I ADD This */}
      {detailsOpen && (
        <StudentModal
          setDetailsOpen={setDetailsOpen}
          detailsOpen={detailsOpen}
          data={data}
        />
      )}
    </span>
  );
}

export function Delete({ attr, modal: Modal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleDelete = (para) => {
    setSelected(para);
    setIsModalOpen(true);
  };

  return (
    <span>
      <span onClick={() => handleDelete(`${attr}`)}>
        {
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
          />
        }
      </span>
      {selected && (
        // <NewsModal
        //   modalOpen={isModalOpen}
        //   setModalOpen={setIsModalOpen}
        //   name={selectedNews}
        // />
        <Modal
          modalOpen={isModalOpen}
          setModalOpen={setIsModalOpen}
          name={selected}
        />
      )}
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

export function StudentAccept({ status }) {
  if (status === "بإنتظار تأكيد الطالب") {
    return (
      <span className="btnContainer">
        {<Button className="acceptBtn">قبول</Button>}
        {<Button className="rejectBtn">رفض</Button>}
      </span>
    );
  } else return <span>-</span>;
}
