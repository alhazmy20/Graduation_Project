import React, { Suspense, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import Table from "../../../components/ui/Table/Table";
import {
  TableText,
  InstitutionAccept,
  StudentDetails,
} from "../../../components/ui/Table/TableFilter";
import "./InstPostDetails.scss";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { getPostApplicants } from "../../../util/api";

const InstPostDetails = () => {
  const applicants_post = useLoaderData();

  const [statusFilter, setStatusFilter] = useState(null);

  const filterData = (studentsData) => {
    const filteredDataSource = statusFilter
      ? studentsData?.filter(
          (application) => application.status === statusFilter
        )
      : studentsData;
    return filteredDataSource;
  };

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
    },
    {
      title: "التخصص",
      dataIndex: "major",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "applicant_status",
      align: "center",
      render: TableText,
    },
    {
      title: "الإجراء",
      dataIndex: "applicant_status",
      align: "center",
      render: (text, row) => <InstitutionAccept status={text} />,
    },
  ];

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  // console.log(filteredDataSource)
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
              <div className="contactContainer">
                <strong className="header">
                  <span>بيانات الاتصال للمنشأة</span>
                </strong>
                <div className="supervisor">
                  <span>
                    <strong>مسؤول الاتصال: </strong>
                  </span>
                  <span>ماهر الحربي</span>
                </div>
                <div className="phone">
                  <span>
                    <strong>رقم الجوال: </strong>
                  </span>
                  <span>+966545930921</span>
                </div>
                <div className="email">
                  <span>
                    <strong>البريد الإلكتروني: </strong>
                  </span>
                  <span>Y-22-02@coop.gov.sa</span>
                </div>
              </div>
            </div>
            <div className="excelContainer">
              <span className="studentApplications">
                <strong>طلبات تقديم الطلاب</strong>
              </span>
              <Button className="excelBtn">
                <FontAwesomeIcon className="icon" icon={faFileCsv} />
                <span className="excelSpan">
                  <strong>Excel</strong>
                </span>
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
                onClick={() =>
                  handleStatusFilterChange("بإنتظار موافقة المنشأة")
                }
              >
                بإنتظار موافقة المنشأة
              </Button>
              <Button
                className="button-filter"
                onClick={() =>
                  handleStatusFilterChange("بإنتظار موافقة الطالب")
                }
              >
                بإنتظار موافقة الطالب
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

export const applicantsPostLoader = ({ params }) => {
  const instId = params.id;
  return defer({ applicantsPost: getPostApplicants(instId) });
};
