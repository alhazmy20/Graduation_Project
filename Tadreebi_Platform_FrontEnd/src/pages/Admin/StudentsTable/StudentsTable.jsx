import "./StudentsTable.scss";
import { Suspense, useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import {
  AdminStudentTable,
  Edit,
} from "../../../components/ui/Table/TableHelpers";
import { Await, useLoaderData } from "react-router-dom";
import { exportExcelFile } from "../../../util/api";
import DeleteModal from "../../../components/ui/DeleteModal/DeleteModal";
import { handlePaginationChange } from "../../../util/helpers";

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
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        return (
          <span>
            <Edit
              record={record}
              endPoint_1={"admin"}
              endPoint_2={"manage-students"}
            />
            <DeleteModal
              name={record.fullName}
              id={record.id}
              endpoint="students"
              deleteType="الطالب"
            />
          </span>
        );
      },
    },
  ];

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
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
                onClick={() => exportExcelFile("institution_students")}
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
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedData.length} سجل
            </p>

            <Table
              col={columns}
              data={filterData(loadedData)}
              Size={pageSize}
              handleChange={(page, pageSize) =>
                handlePaginationChange(
                  page,
                  pageSize,
                  loadedData,
                  setCurrentRange,
                  setPageSize
                )
              }
              emptyText="لا توجد بيانات"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default StudentsTable;
