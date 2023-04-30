import "./InstitutionsTable.scss";
import { Suspense, useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { Delete, Edit } from "../../../components/ui/Table/TableFilter";
import InstitutionDeleteModal from "./components/InstitutionDeleteModal";
import { Await, defer, useLoaderData } from "react-router-dom";
import { exportExcelFile, getAllInstitutions } from "../../../util/api";
import ActivateInstitAccount from "./components/ActivateInstitAccount";

const InstitutionsTable = () => {
  const institutionsData = useLoaderData();

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const filterData = (dataSource) => {
    const filteredDataSource = statusFilter
      ? dataSource?.filter((institution) => institution.status === statusFilter)
      : dataSource;

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
          <>
            <Edit
              record={record}
              endPoint_1={"admin"}
              endPoint_2={"manage-institutions"}
            />
            <Delete name={record.institutionName} modal={InstitutionDeleteModal} institutionId={record.id}/>
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
    const end = Math.min(start + pageSize - 1, institutionsData.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };
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
                onClick={() => exportExcelFile("All Institution")}
              >
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
                المنشآت النشطة
              </Button>
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("غير نشط")}
              >
                المنشآت الغير نشطة
              </Button>
            </div>
            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {institutionsData.length} سجل
            </p>
            <Table
              col={columns}
              data={filterData(loadedData)}
              Size={pageSize}
              handleChange={handlePaginationChange}
              emptyText="لا توجد بيانات"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default InstitutionsTable;

export const institutionsLoader = () => {
  return defer({ institutions: getAllInstitutions() });
};
