import { Button, Modal, notification } from "antd";
import React, { useState } from "react";
import StudentModal from "../../../pages/institution/InstPostDetails/components/StudentModal";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import api from "../../../data/axiosConfig";

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

// export const InstitutionAccept = ({ status, applicant_id }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [statusId, setStatusId] = useState("");
//   const [showBtnContainer, setShowBtnContainer] = useState(true);

//   const handleStatus = async () => {
//     try {
//       await api().put(`api/applications/${applicant_id}`, {
//         status_id: statusId,
//       });
//       setModalOpen(false);
//       setShowBtnContainer(false);
//       notification.success({
//         message: "تم قبول الطالب و سيتم اشعاره بذلك.",
//         description: 'اصبحت حالة الطلب الآن "بإنتظار تأكيد الطالب"',
//       });
//     } catch (error) {
//       console.log(error);
//       notification.error({ message: error.response.data.message });
//     }
//   };

//   return (
//     <>
//       {status === "بإنتظار موافقة المنشأة" && showBtnContainer && (
//         <span className="btnContainer">
//           <Button
//             className="acceptBtn"
//             onClick={() => {
//               setModalOpen(true);
//               setStatusId("2");
//             }}
//             disabled={!showBtnContainer}
//           >
//             قبول
//           </Button>
//           <Button
//             className="rejectBtn"
//             onClick={() => {
//               setModalOpen(true);
//               setStatusId("4");
//             }}
//             disabled={!showBtnContainer}
//           >
//             رفض
//           </Button>
//         </span>
//       )}

//       <Modal
//         title="تنبيه:"
//         className="modalContainer"
//         open={modalOpen}
//         onOk={handleStatus}
//         onCancel={() => setModalOpen(false)}
//       >
//         <div className="modalDetailsContainer">
//           {(() => {
//             if (statusId === "2") {
//               return (
//                 <span className="modalDetails">
//                   <strong>
//                     في حال قبولك الطالب فأنه لا يمكنك ان تتراجع عن القرار و سيتم
//                     اشعار الطالب بالقبول.
//                   </strong>
//                 </span>
//               );
//             } else {
//               return (
//                 <span className="modalDetails">
//                   <strong>
//                     في حال رفضك الطالب فأنه لا يمكنك ان تتراجع عن القرار و سيتم
//                     اشعار الطالب بالرفض.
//                   </strong>
//                 </span>
//               );
//             }
//           })()}
//           <br />
//           <br />
//         </div>
//       </Modal>
//     </>
//   );
// };

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

export function Delete({ name, modal: Modal, adminId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleDelete = (para) => {
    setSelected(para);
    setIsModalOpen(true);
  };

  return (
    <span>
      <span onClick={() => handleDelete(`${name}`)}>
        {
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
          />
        }
      </span>
      {selected && (
        <Modal
          modalOpen={isModalOpen}
          setModalOpen={setIsModalOpen}
          name={selected}
          adminId={adminId}
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
