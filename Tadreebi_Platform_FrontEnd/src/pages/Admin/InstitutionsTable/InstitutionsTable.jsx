import "./InstitutionsTable.scss";
import { Suspense, useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { Edit } from "../../../components/ui/Table/TableHelpers";
import { Await, useLoaderData } from "react-router-dom";
import { exportExcelFile } from "../../../util/api";
import ActivateInstitAccount from "./components/ActivateInstitAccount";
import DeleteModal from "../../../components/ui/DeleteModal/DeleteModal";
import { handlePaginationChange } from "../../../util/helpers";

const InstitutionsTable = () => {
  const institutionsData = useLoaderData();

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const filterData = (dataSource) => {
    let filteredDataSource = dataSource;
    if (statusFilter !== null) {
      filteredDataSource = dataSource.filter((institution) => {
        if (statusFilter === "") {
          return true; // return all records when statusFilter is empty
        }
        return institution.isActive === statusFilter;
      });
    }
    return filteredDataSource;
  };

  const columns = [
    {
      title: "اسم المنشأة",
      dataIndex: "institutionName",
      align: "center",
    },
    {
      title: "الجامعة",
      dataIndex: "city",
      align: "center",
    },
    {
      title: "البريد الإلكتروني",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "تاريخ الإنضمام",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "isActive",
      align: "center",
      render: (text, record) => {
        return <ActivateInstitAccount record={record} />;
      },
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
              endPoint_2={"manage-institutions"}
            />
            <DeleteModal
              name={record.institutionName}
              id={record.id}
              endpoint="institutions"
              deleteType="المنشأة"
            />
          </span>
        );
      },
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={institutionsData?.institutions}
        errorElement={<p>Error loading institutions data.</p>}
      >
        {(loadedData) => (
          <div className="tableContainer">
            <div className="excelContainer">
              <Button
                className="excelBtn"
                onClick={() => exportExcelFile("all_institutions")}
              >
                <FontAwesomeIcon className="icon" icon={faFileCsv} />{" "}
                <strong>Excel</strong>
              </Button>
            </div>
            <div className="filter-container">
              <Button
                className="button-filter"
                onClick={() => setStatusFilter("")}
              >
                الكل
              </Button>
              <Button
                className="button-filter"
                onClick={() => setStatusFilter(1)}
              >
                المنشآت النشطة
              </Button>
              <Button
                className="button-filter"
                onClick={() => setStatusFilter(0)}
              >
                المنشآت الغير نشطة
              </Button>
            </div>
            <span className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedData.length} سجل
            </span>
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

export default InstitutionsTable;
