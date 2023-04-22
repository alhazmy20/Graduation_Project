import "./InstitutionsTable.scss";
import { Suspense, useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import {
  Delete,
  Edit,
  StatusText,
} from "../../../components/ui/Table/TableFilter";
import InstitutionsModal from "./components/InstitutionsModal";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getAllInstitutions } from "../../../util/api";

const InstitutionsTable = () => {
  const institutionsData = useLoaderData();

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  // const filteredDataSource = statusFilter
  //   ? InstData.filter((application) => application.status === statusFilter)
  //   : InstData;

  const columns = [
    {
      title: "اسم المؤسسة",
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
      render: StatusText,
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
            <Delete attr={record.institutionName} modal={InstitutionsModal} />
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
          المؤسسات النشطة
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("غير نشط")}
        >
          المؤسسات الغير نشطة
        </Button>
      </div>
      <p className="rangeText">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {institutionsData.length} سجل
      </p>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={institutionsData?.institutions}
          errorElement={<p>Error loading blog posts.</p>}
        >
          {(loadedData) => <Table
            col={columns}
            data={loadedData}
            Size={pageSize}
            handleChange={handlePaginationChange}
            emptyText="لا توجد بيانات"
          />}
        </Await>
      </Suspense>
      
    </div>
  );
};

export default InstitutionsTable;

export const institutionsLoader = () => {
  return defer({ institutions: getAllInstitutions() });
};
