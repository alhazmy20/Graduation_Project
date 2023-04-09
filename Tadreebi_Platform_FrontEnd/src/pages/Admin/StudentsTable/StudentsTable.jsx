import "./StudentsTable.scss";
import { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { Link } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import StudentsModal from "./components/StudentsModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../../../data/API";
import NoData from "../../../components/ui/NoData/NoData";

const StudentsTable = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/students");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  if (!data) {
    return <NoData text="لا يوجد طلاب حاليا" />;
  }

  //NOTE
  const {
    data: { data: studentsData },
  } = data;

  const columns = [
    {
      title: "اسم الطالب",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: "الجامعة",
      dataIndex: "university",
      align: "center",
    },
    {
      title: "تاريخ الإنضمام",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        let style = {};
        if (text === "نشط") {
          style.color = "#008374b2";
        } else if (text === "غير نشط") {
          style.color = "red";
        }
        return <span style={style}>{text}</span>;
      },
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        let buttons = {};
        buttons = (
          <span>
            <Link to={`/admin/manage-students/${record.id}`}>
              {
                <FontAwesomeIcon
                  className="icon"
                  icon={faPenToSquare}
                  style={{ color: "#008374b2" }}
                />
              }
            </Link>
            <span onClick={() => handleDelete(`${record.fullName}`)}>
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
        return buttons;
      },
    },
  ];

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  //NOTE
  const filteredDataSource = statusFilter
    ? studentsData.filter((application) => application.status === statusFilter)
    : studentsData;

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, data.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };
  return (
    <div className="tableContainer">
      <div className="excelContainer">
        <Button className="excelBtn">
          <FontAwesomeIcon className="icon" icon={faFileCsv} />{" "}
          <strong>Excel</strong>
        </Button>
      </div>
      <div className="filterTable">
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("")}
        >
          الكل
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("نشط")}
        >
          الطلاب النشطين
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("غير نشط")}
        >
          الطلاب الغير نشطين
        </Button>
      </div>
      <p className="rangeText">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {studentsData.length}{" "}
        سجل
      </p>
      <Table
        col={columns}
        data={filteredDataSource}
        Size={pageSize}
        handleChange={handlePaginationChange}
        emptyText="لا توجد بيانات"
      />
    </div>
  );
};

export default StudentsTable;
