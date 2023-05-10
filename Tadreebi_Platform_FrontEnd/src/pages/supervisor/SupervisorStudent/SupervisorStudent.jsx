import React, { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Button, Input } from "antd";
import { exportExcelFile } from "../../../util/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import TableUI from "../../../components/ui/Table/Table";
import { handlePaginationChange } from "../../../util/helpers";

const SupervisorStudent = () => {
  const studentData = useLoaderData();
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const handleNameSearch = (e) => {
    setIsSearch(true);
    const searchName = e.target.value;
    const filteredStudents = studentData.students._data.filter((s) => {
      return s.fullName.includes(searchName);
    });
    setFilteredData(filteredStudents);
  };

  const columns = [
    {
      title: "اسم الطالب",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: "البريد الجامعي",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "رقم الجوال",
      dataIndex: "phone",
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
          resolve={studentData?.students}
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
                عرض {currentRange[0]} إلى {currentRange[1]} من أصل
                {loadedData.length} سجل
              </p>

              <div className="table-filter">
                <Input
                  className="nameInput"
                  placeholder="البحث بإسم الطالب"
                  onChange={handleNameSearch}
                  style={{margin:'10px'}}
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
