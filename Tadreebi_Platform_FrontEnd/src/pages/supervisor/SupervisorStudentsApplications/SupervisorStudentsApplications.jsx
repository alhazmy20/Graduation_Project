import React, { Suspense, useEffect, useState } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import {
  StudentDetails,
  TableText,
} from "../../../components/ui/Table/TableHelpers";
import Table from "../../../components/ui/Table/Table";
import { dataFiltering, handlePaginationChange } from "../../../util/helpers";
import StudentAcceptProcedure from "../../institution/InstPostDetails/components/StudentAcceptProcedure";
import TableFilterSelect from "../../../components/ui/TableFilterSelect/TableFilterSelect";

const SupervisorStudentsApplications = () => {
  const applicants_post = useLoaderData();

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
      title: "اسم الطالب",
      dataIndex: ["student", "fullName"],
      align: "center",
      render: (text, record) => {
        return (
          <StudentDetails
            name={text}
            data={record?.student}
            isSupervisor={true}
          />
        );
      },
    },
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
      render: (text, row) => (
        <StudentAcceptProcedure
          status={text}
          applicant_id={row.id}
          acceptStatusId="3"
          rejectStatusId="6"
        />
      ),
    },
  ];


  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={applicants_post?.applications}
        errorElement={<p>Error loading</p>}
      >
        {(loadedData) => (
          <div className="tableContainer">
            <h1 className="Header">طلبات التقديم</h1>
            <TableFilterSelect setStatusFilter={setStatusFilter} isSupervisor={true}/>
            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedData?.length} سجل
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

export default SupervisorStudentsApplications;
