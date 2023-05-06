import React, { Suspense, useEffect, useState } from 'react'
import { getPostApplicants, exportExcelFile, getStudentApplications } from '../../../util/api';
import { Await, Link, defer, useLoaderData, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import Spinner from '../../../components/ui/Spinner/Spinner';
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import StudentAcceptProcedure from '../../institution/InstPostDetails/components/StudentAcceptProcedure';
import { StudentAccept, StudentDetails, TableText } from '../../../components/ui/Table/TableHelpers';
import { Button } from 'antd';
import Table from "../../../components/ui/Table/Table";
import { dataFiltering, handlePaginationChange } from '../../../util/helpers';

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
        dataIndex: ["student","fullName"],
        align: "center",
        render: (text, record) => {
          return <StudentDetails name={text} data={record?.student} isSupervisor={true} />;
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
        render: (text, row) => {
          return <StudentAccept status={text} />;
        },
      },
    ];
  

    const handleStatusFilterChange = (status) => {
      setStatusFilter(status);
    };
  
      
  return (
    <Suspense fallback={<Spinner/>}>
        <Await
        resolve={applicants_post?.applications}
        errorElement={<p>Error loading</p>}
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
                  handleStatusFilterChange("بإنتظار موافقة المشرف الجامعي")
                }
              >
                بإنتظار موافقة المشرف الجامعي
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
  )
}

export default SupervisorStudentsApplications
