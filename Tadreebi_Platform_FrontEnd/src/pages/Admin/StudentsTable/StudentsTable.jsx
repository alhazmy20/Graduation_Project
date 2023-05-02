import "./StudentsTable.scss";
import { Suspense, useState } from "react";
import { Button, notification } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import {
  AdminStudentTable,
  Delete,
  Edit,
} from "../../../components/ui/Table/TableFilter";
import StudentDeleteModal from "./components/StudentDeleteModal";
import { Await, defer, useLoaderData } from "react-router-dom";
import { exportExcelFile, getAllStudents } from "../../../util/api";

const StudentsTable = () => {
  const studentsData = useLoaderData();

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const filterData = (dataSource) => {
    const filteredDataSource = statusFilter
      ? dataSource?.filter((student) => student.status === statusFilter)
      : dataSource;
    return filteredDataSource;
  };

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
      render: AdminStudentTable,
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Edit
              record={record}
              endPoint_1={"admin"}
              endPoint_2={"manage-students"}
            />
            <Delete
              name={record.fullName}
              modal={StudentDeleteModal}
              studentId={record.id}
            />
          </>
        );
      },
    },
  ];

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handlePaginationChange = (page, pageSize, loadedData) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, loadedData.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={studentsData?.students}
        errorElement={<p>Error loading the data.</p>}
      >
    {(loadedData) => (
    <div className="tableContainer">
      <div className="excelContainer">
        <Button
          className="excelBtn"
          onClick={() => exportExcelFile("All Student")}
        >
          <FontAwesomeIcon className="icon" icon={faFileCsv} />
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
      عرض {currentRange[0]} إلى {currentRange[1]} من أصل {" "}
              {loadedData.length} سجل
      </p>
      
          
            <Table
              col={columns}
              data={filterData(loadedData)}
              Size={pageSize}
              handleChange={(page, pageSize) => handlePaginationChange(page, pageSize, loadedData)}
              emptyText="لا توجد بيانات"
            />
            </div>
          )}
        </Await>
      </Suspense>
    
  );
};

export default StudentsTable;

export const studentsLoader = () => {
  return defer({ students: getAllStudents() });
};
