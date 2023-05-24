import React, { Suspense, useState } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import {
  StudentDetails,
  TableText,
} from "../../../components/ui/Table/TableHelpers";
import Table from "../../../components/ui/Table/Table";
import { handlePaginationChange } from "../../../util/helpers";
import StudentAcceptProcedure from "../../institution/InstPostDetails/components/StudentAcceptProcedure";
import "./SupervisorStudentsApplications.scss";
import FilterSearch from "../../../components/ui/FilterSearch";

const SupervisorStudentsApplications = () => {
  const applicants_post = useLoaderData();

  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchName, setSearchName] = useState("");

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const handleFilterSearch = () => {
    setIsSearch(true);

    const filteredStudents = applicants_post.applications._data.filter(
      (data) => {
        const studentFullName = data.student.fullName ?? "";
        const status = data.status;

        const isNameMatch = studentFullName.includes(searchName);
        const isStatusMatch = statusFilter ? status === statusFilter : true;

        return isNameMatch && isStatusMatch;
      }
    );

    setFilteredData(filteredStudents);
  };

  const columns = [
    {
      title: "اسم الطالب",
      dataIndex: ["students", "fullName"],
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
      dataIndex: "postTitle",
      align: "center",
      render: (text, row) => {
        return (       
          <Link className="row-title" to={`post/${row.post_id}`}>
            {text}
          </Link>
        );
      },
    },
    {
      title: "اسم المؤسسة",
      dataIndex: "institutionName",
      align: "center",
      render: (text, row) => {
        return (
          <Link className="row-title" to={`institution-info/${row.institutionId}`}>
            {text}
          </Link>
        );
      },
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
        return <TableText text={text} />;
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

  console.log(applicants_post?.applications)

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={applicants_post?.applications}
        errorElement={<p>Error loading</p>}
      >
        {(loadedData) => (
          <div className="supervisor-student-app">
            <div className="tableContainer">
              <h1 className="header">طلبات التقديم</h1>
              <FilterSearch
                setSearchName={setSearchName}
                setStatusFilter={setStatusFilter}
                isSupervisor={true}
                handleFilterSearch={handleFilterSearch}
              />

              <p className="rangeText">
                عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
                {loadedData?.length} سجل
              </p>
              <Table
                col={columns}
                data={isSearch ? filteredData : loadedData}
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

export default SupervisorStudentsApplications;
