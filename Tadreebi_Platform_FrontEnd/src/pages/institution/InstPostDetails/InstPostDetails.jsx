import React, { Suspense, useState } from "react";
import { Await, useLoaderData, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import Table from "../../../components/ui/Table/Table";
import {
  TableText,
  StudentDetails,
} from "../../../components/ui/Table/TableHelpers";
import "./InstPostDetails.scss";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { exportExcelFile } from "../../../util/api";
import StudentAcceptProcedure from "./components/StudentAcceptProcedure";
import FilterSearch from "../../../components/ui/FilterSearch";

const InstPostDetails = () => {
  const applicantsPost = useLoaderData();
  const { id } = useParams();

  const [statusFilter, setStatusFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchName, setSearchName] = useState("");

  const handleFilterSearch = () => {
    setIsSearch(true);

    const filteredStudents =
      applicantsPost.applicantsPost._data.applicants.data.data.filter(
        (data) => {
          const studentFullName = data.student.fullName ?? "";
          const status = data.status;

          const isNameMatch = studentFullName.includes(searchName);
          const isStatusMatch = statusFilter ? status === statusFilter : true;

          return isNameMatch && isStatusMatch;
        }
      );

    const filterdData = formattedResponse(filteredStudents);

    setFilteredData(filterdData);
  };

  console.log(filteredData);

  const formattedResponse = (data) => {
    const applicantData = data?.map((item) => ({
      applicant_id: item?.id,
      applicant_status: item?.status,
      created_at: item?.created_at,
      ...item?.student,
    }));

    return applicantData;
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "fullName",
      align: "center",
      render: (text, record) => {
        return <StudentDetails name={text} data={record} />;
      },
    },
    {
      title: "الجامعة",
      dataIndex: "university",
      align: "center",
    },
    {
      title: "المعدل",
      dataIndex: "GPA",
      align: "center",
      render: (text, row) => {
        return <span>{`${row?.GPA}/${row?.GPA_Type}`}</span>;
      },
      sorter: (a, b) => {
        const gpaA = a?.GPA_Type === 5 ? a?.GPA : (a?.GPA * 5) / 4;
        const gpaB = b?.GPA_Type === 5 ? b?.GPA : (b?.GPA * 5) / 4;
        return gpaA - gpaB;
      },
    },
    {
      title: "التخصص",
      dataIndex: "major",
      align: "center",
      render: (text, record) => {
        return text;
      },
    },
    {
      title: "الحالة",
      dataIndex: "applicant_status",
      align: "center",
      render: (text, row) => {
        return <TableText text={text} />;
      },
    },
    {
      title: "الإجراء",
      dataIndex: "applicant_status",
      align: "center",
      render: (text, row) => (
        <StudentAcceptProcedure
          status={text}
          applicant_id={row?.applicant_id}
          acceptStatusId="2"
          rejectStatusId="5"
        />
      ),
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={applicantsPost?.applicantsPost}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="postDetailsContainer">
            <div className="detailsContainer">
              <div className="detailsTable">
                <PostDetailsTable data={loadedData?.post} />
              </div>
            </div>
            <div className="excelContainer">
              <span className="studentApplications">
                <strong>طلبات تقديم الطلاب</strong>
              </span>
              <Button
                className="excelBtn"
                onClick={() =>
                  exportExcelFile(
                    "post_applicants",
                    id,
                    loadedData?.post?.title
                  )
                }
              >
                <FontAwesomeIcon className="icon" icon={faFileCsv} />
                <span className="excelSpan">
                  <strong>Excel</strong>
                </span>
              </Button>
            </div>
            <FilterSearch
              setSearchName={setSearchName}
              setStatusFilter={setStatusFilter}
              handleFilterSearch={handleFilterSearch}
            />
            <Table
              col={columns}
              data={
                isSearch
                  ? filteredData
                  : formattedResponse(loadedData?.applicants?.data?.data)
              }
              emptyText="لا يوجد اي متقدمين حاليا"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default InstPostDetails;
