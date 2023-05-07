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
import TableFilterButtons from '../../../components/ui/TableFilterButtons/TableFilterButtons';

const InstPostDetails = () => {
  const applicants_post = useLoaderData();
  const { id } = useParams();

  const [statusFilter, setStatusFilter] = useState(null);

  const formattedResponse = (data) => {
    const applicantData = data.map((item) => ({
      applicant_id: item.id,
      applicant_status: item.status,
      created_at: item.created_at,
      ...item.student,
    }));

    const filteredDataSource = statusFilter
      ? applicantData?.filter(
          (application) => application.applicant_status === statusFilter
        )
      : applicantData;

    return filteredDataSource;
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
        return <span>{`${row.GPA}/${row.GPA_Type}`}</span>;
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
          applicant_id={row.applicant_id}
          acceptStatusId="2"
          rejectStatusId="5"
        />
      ),
    },
  ];

  console.log(applicants_post?.applicantsPost);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={applicants_post?.applicantsPost}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="postDetailsContainer">
            <div className="detailsContainer">
              <div className="detailsTable">
                <PostDetailsTable data={loadedData.post} />
              </div>
            </div>
            <div className="excelContainer">
              <span className="studentApplications">
                <strong>طلبات تقديم الطلاب</strong>
              </span>
              <Button
                className="excelBtn"
                onClick={() =>
                  exportExcelFile("Post Applicants", id, loadedData.post.title)
                }
              >
                <FontAwesomeIcon className="icon" icon={faFileCsv} />
                <span className="excelSpan">
                  <strong>Excel</strong>
                </span>
              </Button>
            </div>
            <TableFilterButtons setStatusFilter={setStatusFilter}/>
            <Table
              col={columns}
              data={formattedResponse(loadedData.applicants.data.data)}
              emptyText="لا يوجد اي متقدمين حاليا"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default InstPostDetails;
