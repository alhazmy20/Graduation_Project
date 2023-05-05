import React, { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Edit } from "../../../components/ui/Table/TableHelpers";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { exportExcelFile } from "../../../util/api";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import Table from "../../../components/ui/Table/Table";
import { handlePaginationChange } from "../../../util/helpers";
import DeleteModal from "../../../components/ui/DeleteModal/DeleteModal";

const SupervisorsTable = () => {
  const supervisorsData = useLoaderData();

  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const columns = [
    {
      title: "البريد الجامعي",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "القسم",
      dataIndex: "department",
      align: "center",
    },
    {
      title: "الكلية",
      dataIndex: "college",
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
      align: "center",
      render: (text, record) => {
        return (
          <span>
            <Edit
              record={record}
              endPoint_1={"admin"}
              endPoint_2={"manage-supervisors"}
            />
            <DeleteModal
              name={record.department}
              id={record.id}
              endpoint="supervisors"
              deleteType="مشرف الجامعة"
            />
          </span>
        );
      },
    },
  ];

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
                onClick={() => exportExcelFile("All Student")}
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

export default SupervisorsTable;
