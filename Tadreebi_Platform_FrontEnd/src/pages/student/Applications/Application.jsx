import "./Application.scss";
import { Suspense, useEffect, useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import {
  StudentAccept,
  TableText,
} from "../../../components/ui/Table/TableHelpers";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Await, useLoaderData } from "react-router-dom";
import { dataFiltering, handlePaginationChange } from "../../../util/helpers";

const Application = () => {
  const applicationsData = useLoaderData();
  const [status, setStatus] = useState(null);
  const [applicantId, setApplicantId] = useState(null);

  useEffect(() => {
    setStatus(status);
    setApplicantId(applicantId);
  }, [status, applicantId]);

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const columns = [
    {
      title: "الفرصة التدريبية",
      dataIndex: "post",
      align: "center",
    },
    {
      title: "اسم المؤسسة",
      dataIndex: "instituion",
      align: "center",
    },
    {
      title: "تاريخ التقديم",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "status",
      align: "center",
      render: (text, row) => {
        setStatus(text);
        return (
          <TableText
            status={status}
            text={text}
            id={row.applicant_id}
            applicantId={applicantId}
          />
        );
      },
    },
    {
      title: "الإجراء",
      dataIndex: "status",
      align: "center",
      render: (text, row) => {
        return <StudentAccept status={text} />;
      },
    },
  ];

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={applicationsData?.applications}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="tableContainer">
            <h1 className="Header">طلبات التقديم</h1>
            <div className="filterTable">
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("")}
              >
                الكل
              </Button>
              <Button
                className="button-filter"
                onClick={() =>
                  handleStatusFilterChange("بإنتظار موافقة المنشأة")
                }
              >
                بإنتظار موافقة المنشأة
              </Button>
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("بإنتظار تأكيد الطالب")}
              >
                بإنتظار تأكيد الطالب
              </Button>
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("مقبول")}
              >
                مقبول
              </Button>
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("مرفوض")}
              >
                مرفوض
              </Button>
            </div>
            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedData.length} سجل
            </p>
            <Table
              col={columns}
              data={dataFiltering(loadedData, statusFilter)}
              filter={statusFilter}
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

export default Application;
