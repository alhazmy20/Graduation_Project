import React, { Suspense, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Delete, Edit } from "../../../components/ui/Table/TableFilter";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Button, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { exportExcelFile, getAllSupervisors } from "../../../util/api";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";

const SupervisorsTable = () => {
  const supervisorsData = useLoaderData();

  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const columns = [
    {
      title: "القسم",
      dataIndex: "department",
      align: "center",
    },
    // {
    //   title: "الكلية",
    //   dataIndex: "college",
    //   align: "center",
    // },
    // {
    //   title: "الجامعة",
    //   dataIndex: "university",
    //   align: "center",
    // },
    // {
    //   title: "تاريخ الإنضمام",
    //   dataIndex: "created_at",
    //   align: "center",
    // },
    // {
    //   title: "الإجراء",
    //   align: "center",
    //   render: (text, record) => {
    //     return (
    //       <div>
    //         <Edit
    //           record={record}
    //           endPoint_1={"admin"}
    //           endPoint_2={"manage-students"}
    //         />
    //         <Delete name={record.department} />
    //       </div>
    //     );
    //   },
    // },
  ];

  const handlePaginationChange = (page, pageSize, loadedData) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, loadedData.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };
  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={supervisorsData?.supervisors}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="tableContainer">
            <div className="excelContainer">
              <Button
                className="excelBtn"
                onClick={() => console.log(loadedData)}
              >
                <FontAwesomeIcon className="icon" icon={faFileCsv} />
                <strong>Excel</strong>
              </Button>
            </div>

            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedData.length} سجل
            </p>

            <Table
              col={columns}
              data={loadedData}
              Size={pageSize}
              handleChange={(page, pageSize) =>
                handlePaginationChange(page, pageSize, loadedData)
              }
              emptyText="لا توجد بيانات"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default SupervisorsTable;

export const supervisorsLoader = () => {
  return defer({ supervisors: getAllSupervisors() });
};
