import "./AdminsTable.scss";
import { useState } from "react";
import { Button, notification } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../../../data/API";
import NoData from "../../../components/ui/NoData/NoData";
import { AdminStudentTable, Delete, Edit } from "../../../components/ui/Table/TableFilter";
import AdminsModal from "./components/AdminsModal";

const AdminsTable = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/admins");
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
    return <NoData text="لا يوجد مشرفين حاليا" />;
  }

  const {
    data: { data: adminsData },
  } = data;

  const filteredDataSource = statusFilter
    ? adminsData.filter((application) => application.status === statusFilter)
    : adminsData;

  const columns = [
    {
      title: "إيميل المشرف",
      dataIndex: "managerEmail",
      align: "center",
    },
    {
      title: "هاتف المشرف",
      dataIndex: "managerPhone",
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
      render: AdminStudentTable
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        return <><Edit record={record} endPoint={"manage-admins"}/>
        <Delete attr={record.managerEmail} modal={AdminsModal}/></>
      },
    },
  ];


  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, adminsData.length);
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
          المشرفين النشطين
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("غير نشط")}
        >
          المشرفين الغير نشطين
        </Button>
      </div>
      <p className="rangeText">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {adminsData.length}{" "}
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

export default AdminsTable;
