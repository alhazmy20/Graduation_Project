import "./Application.scss";
import { Suspense, useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import {
  StudentAccept,
  TableText,
} from "../../../components/ui/Table/TableFilter";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { getStudentApplications } from "../../../util/api";
import { Await, defer, useLoaderData } from "react-router-dom";

const Application = () => {
  const applicationsData = useLoaderData();

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(6);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const filterApplications = (applications) => {
    const filteredDataSource = statusFilter
      ? applications.filter(
          (application) => application.status === statusFilter
        )
      : applications;

    return filteredDataSource;
  };

  const columns = [
    {
      title: "اسم المؤسسة",
      dataIndex: "instituion",
      align: "center",
    },
    {
      title: "الفرصة التدريبية",
      dataIndex: "post",
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
      render: (text, row)=>{
        return <TableText text={text}/>
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

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, applicationsData.length); //FIXME
    setCurrentRange([start, end]);
    setPageSize(pageSize);
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
              data={filterApplications(loadedData)}
              filter={statusFilter}
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

export default Application;

export const applicationsLoader = () => {
  return defer({ applications: getStudentApplications() });
};
