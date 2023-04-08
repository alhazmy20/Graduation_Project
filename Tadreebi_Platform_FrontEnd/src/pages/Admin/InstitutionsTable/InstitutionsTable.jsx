import "./InstitutionsTable.scss";
import { useState } from "react";
import { Button, notification } from "antd";
import { Link } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import InstitutionsModal from "./components/InstitutionsModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../../../data/API";
import NoData from "../../../components/ui/NoData/NoData";
const InstitutionsTable = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/institutions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);


  if (loading) {
    return <Spinner />
  }

  if (error) {
    return notification.error(error);
  }

  if (!data) {
    return <NoData text="لا توجد مؤسسات حاليا"/>
  }
  
  
  const columns = [
    {
      title: "اسم المؤسسة",
      dataIndex: "institutionName",
      align: "center",
    },
    {
      title: "الجامعة",
      dataIndex: "city",
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
            <span onClick={() => handleDelete(`${record.institutionName}`)}>
              {
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "red", cursor: "pointer" }}
                />
              }
            </span>
            {selectedStudent && (
              <InstitutionsModal
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
  const filteredDataSource = statusFilter
    ? data.filter((application) => application.status === statusFilter)
    : data;
 

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
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {data.length} سجل
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

export default InstitutionsTable;
