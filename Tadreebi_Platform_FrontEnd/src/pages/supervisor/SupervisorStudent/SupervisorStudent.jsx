import React, { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Button, Input } from "antd";
import { exportExcelFile } from "../../../util/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import TableUI from "../../../components/ui/Table/Table";
import { handlePaginationChange } from "../../../util/helpers";
import { StudentDetails } from "../../../components/ui/Table/TableHelpers";

const SupervisorStudent = () => {
  const studentsData = useLoaderData();
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const handleStudentNameSearch = (e) => {
    setIsSearch(true);
    const searchName = e.target.value;
    const filteredStudents = studentsData.students._data.filter((s) => {
      return s.fullName.includes(searchName);
    });
    setFilteredData(filteredStudents);
  };

  const columns = [
    {
      title: "اسم الطالب",
      dataIndex: "fullName",
      align: "center",
      render: (text, record) => {
        return <StudentDetails name={text} data={record} isSupervisor={true} />;
      },
    },
    {
      title: "البريد الجامعي",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "تاريخ الإنضمام",
      dataIndex: "created_at",
      align: "center",
    },
  ];

  return (
    <div className="supervisor-student">
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
                  onClick={() => exportExcelFile("supervisor_students")}
                >
                  <FontAwesomeIcon className="icon" icon={faFileCsv} />
                  <strong>Excel</strong>
                </Button>
              </div>
              <p className="rangeText">
                عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
                {loadedData.length} سجل
              </p>

              <div className="filter-container">
                <Input
                  className="nameInput"
                  placeholder="البحث بإسم الطالب"
                  onChange={handleStudentNameSearch}
                  style={{ margin: "0 10px", maxWidth: "500px" }}
                />
              </div>

              <TableUI
                col={columns}
                data={isSearch ? filteredData : loadedData}
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
                emptyText={"لا توجد بيانات"}
              />
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default SupervisorStudent;
