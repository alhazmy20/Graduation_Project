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
import TableFilterSelect from "../../../components/ui/TableFilterSelect/TableFilterSelect";
import { Button, Input } from "antd";
import "./SupervisorStudentsApplications.scss";

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
          <Link className="row-title" to={`post/${row.post_id}`}>
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

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={applicants_post?.applications}
        errorElement={<p>Error loading</p>}
      >
        {(loadedData) => (
          <div className="tableContainer">
            <h1 className="header">طلبات التقديم</h1>
            <div className="table-filter">
              <span>تصفية على حسب: </span>
              <TableFilterSelect
                setStatusFilter={setStatusFilter}
                isSupervisor={true}
              />
              <Input
                placeholder="البحث بإسم الطالب"
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Button onClick={handleFilterSearch}>Search</Button>
            </div>

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
        )}
      </Await>
    </Suspense>
  );
};

export default SupervisorStudentsApplications;
