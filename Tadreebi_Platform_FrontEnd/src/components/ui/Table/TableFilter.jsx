import { Button } from "antd";
import React, { useState } from "react";
import ConditionModal from "../../../pages/institution/InstPostDetails/components/conditionModal";
import StudentModal from "../../../pages/institution/InstPostDetails/components/StudentModal";
import PostsModal from "../../../pages/Admin/PostsTable/components/PostsModal";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewsModal from "../../../pages/Admin/NewsTable/components/NewsModal";
import { Link } from "react-router-dom";
import InstitutionsModal from "../../../pages/Admin/InstitutionsTable/components/InstitutionsModal";
import StudentsModal from "../../../pages/Admin/StudentsTable/components/StudentsModal";
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
      }{/*I ADD This */}
       {detailsOpen && <StudentModal setDetailsOpen={setDetailsOpen} detailsOpen={detailsOpen} id={id}/>}
    </span>
  );
}


export function NewDelete({attr}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleDelete = (news) => {
    setSelectedNews(news);
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
        {selectedNews && (
          <NewsModal
            modalOpen={isModalOpen}
            setModalOpen={setIsModalOpen}
            name={selectedNews}
          />
        )}
      </span> 
  );
}

export function InstitutionDelete({attr}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInst, setSelectedInst] = useState(null);

  const handleDelete = (institution) => {
    setSelectedInst(institution);
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
        {selectedInst && (
          <InstitutionsModal
            modalOpen={isModalOpen}
            setModalOpen={setIsModalOpen}
            name={selectedInst}
          />
        )}
      </span> 
  );
}


export function PostDelete({attr}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = (post) => {
    setSelectedPost(post);
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
        {selectedPost && (
          <PostsModal
            modalOpen={isModalOpen}
            setModalOpen={setIsModalOpen}
            name={selectedPost}
          />
        )}
      </span> 
  );
}

export function StudentDelete({attr}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDelete = (student) => {
    setSelectedStudent(student);
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
        {selectedStudent && (
          <StudentsModal
            modalOpen={isModalOpen}
            setModalOpen={setIsModalOpen}
            name={selectedStudent}
          />
        )}
      </span> 
  );
}

export function Edit({record,endPoint}){
  return (
    <span>
    <Link to={`/admin/${endPoint}/${record.id}`}>
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