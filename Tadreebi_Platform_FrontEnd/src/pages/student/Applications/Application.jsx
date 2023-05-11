import "./Application.scss";
import { Suspense, useEffect, useState } from "react";
import Table from "../../../components/ui/Table/Table";
import { TableText } from "../../../components/ui/Table/TableHelpers";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Await, Link, useLoaderData } from "react-router-dom";
import { dataFiltering, handlePaginationChange } from "../../../util/helpers";
import StudentAcceptProcedure from "../../institution/InstPostDetails/components/StudentAcceptProcedure";
import TableFilterSelect from "../../../components/ui/TableFilterSelect";

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
      render: (text, row) => {
        return (
          <Link className="row-title" to={`post/${row.id}`}>
            {text}
          </Link>
        );
      },
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
        return <TableText text={status} />;
      },
    },
    {
      title: "الإجراء",
      dataIndex: "status",
      align: "center",
      render: (text, row) => (
        <StudentAcceptProcedure
          status={text}
          applicant_id={row.id}
          acceptStatusId="4"
          rejectStatusId="7"
        />
      ),
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={applicationsData?.applications}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="studentApplications">
            <div className="tableContainer">
              <h1 className="header">طلبات التقديم</h1>
              <div className="filter-container">
                <span className="filter-text">تصفية على حسب</span>
                <TableFilterSelect setStatusFilter={setStatusFilter} />
              </div>
              <p className="rangeText">
                عرض {currentRange[0]} إلى {currentRange[1]} من أصل
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
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default Application;
