import "./StudentsTable.scss";
import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import StudentsModal from "./components/StudentsModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { GetAllNews } from "../../../data/API";
const StudentsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { data, loading } = GetAllNews("http://localhost:8000/students");
  const handleDelete = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  const dataSource = [
    {
      key: "1",
      name: "فلان فلان الفلاني",
      uni: "جامعة طيبة",
      date: "01/01/2023",
      status: "غير نشط",
    },
    {
      key: "2",
      name: "فلان فلان الفلاني",
      uni: "جامعة الملك فهد للبترول و المعادن",
      date: "01/01/2023",
      status: "نشط",
    },
    {
      key: "3",
      name: "فلان فلان الفلاني",
      uni: "جامعة الملك سعود",
      date: "01/01/2023",
      status: "نشط",
    },
  ];

  const columns = [
    {
      title: "اسم الطالب",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "الجامعة",
      dataIndex: "uni",
      align: "center",
    },
    {
      title: "تاريخ الإنضمام",
      dataIndex: "date",
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
            <Link>
              {
                <FontAwesomeIcon
                  className="icon"
                  icon={faPenToSquare}
                  style={{ color: "#008374b2" }}
                />
              }
            </Link>
            <span onClick={() => handleDelete(`${record.name}`)}>
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

  const [statusFilter, setStatusFilter] = useState(null);
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };
  const filteredDataSource = statusFilter
    ? dataSource.filter((application) => application.status === statusFilter)
    : dataSource;

  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

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
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {dataSource.length}{" "}
        سجل
      </p>
      <Table
        col={columns}
        data={filteredDataSource}
        Size={pageSize}
        handleChange={handlePaginationChange}
      />
    </div>
  );
};

export default StudentsTable;
