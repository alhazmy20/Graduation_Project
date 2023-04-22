import "./StudentsTable.scss";
import { Suspense, useState } from "react";
import { Button, notification } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../../../data/API";
import NoData from "../../../components/ui/NoData/NoData";
import {
  AdminStudentTable,
  Delete,
  Edit,
  StudentDelete,
} from "../../../components/ui/Table/TableFilter";
import StudentsModal from "./components/StudentsModal";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getAllStudents } from "../../../util/api";

const StudentsTable = () => {
  const studentsData = useLoaderData();

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  // const filteredDataSource = statusFilter
  //   ? studentsData.filter((application) => application.status === statusFilter)
  //   : studentsData;

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
            <Delete attr={record.fullName} modal={StudentsModal} />
          </>
        );
      },
    },
  ];

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
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={studentsData?.students}
          errorElement={<p>Error loading blog posts.</p>}
        >
          {(loadedData) => (
            <Table
              col={columns}
              data={loadedData}
              Size={pageSize}
              handleChange={handlePaginationChange}
              emptyText="لا توجد بيانات"
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default StudentsTable;

export const studentsLoader = () => {
  return defer({ students: getAllStudents() });
};
