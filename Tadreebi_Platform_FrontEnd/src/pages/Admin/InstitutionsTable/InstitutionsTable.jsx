import "./InstitutionsTable.scss";
import { useState } from "react";
import { Button, notification, Switch } from "antd";
import { Link } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import InstitutionsModal from "./components/InstitutionsModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../../../data/API";
import NoData from "../../../components/ui/NoData/NoData";
import { AdminInstitutionText } from "../../../components/ui/Table/TableFilter";

const InstitutionsTable = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/institutions"
  );
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
    return <NoData text="لا توجد مؤسسات حاليا" />;
  }

  const {
    data: { data: studentsData },
  } = data;

  const filteredDataSource = statusFilter
    ? studentsData.filter((application) => application.status === statusFilter)
    : studentsData;

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
      render: AdminInstitutionText
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        let buttons = {};
        buttons = (
          <span>
            <Link to={`/admin/manage-institutions/${record.id}`}>
              {
                <FontAwesomeIcon
                  className="icon"
                  icon={faPenToSquare}
                  style={{ color: "#008374b2" }}
                />
              }
            </Link>
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

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, studentsData.length);
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
          المؤسسات النشطة
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("غير نشط")}
        >
          المؤسسات الغير نشطة
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

export default InstitutionsTable;
