import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner"
import PostDetailsTable from "../../../components/ui/PostDetailsTable/PostDetailsTable";
import TableUI from "../../../components/ui/Table/Table";
import {TableText, InstitutionAccept,StudentDetails} from "../../../components/ui/Table/TableFilter";
import { GetNewsId, useFetch } from "../../../data/API";
import "./InstPostDetails.scss";
import { Button, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import ConditionModal from "./components/conditionModal";
import StudentModal from "./components/StudentModal";
import NoData from "../../../components/ui/NoData/NoData";

const InstPostDetails = () => {
  const { id } = useParams();
  const { data, error, loading } = GetNewsId(
    `http://localhost:8000/post`
  );
  const {data: {data: response}} = useFetch( `http://localhost:8000/students`)
  const [statusFilter, setStatusFilter] = useState(null);
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  if (!data) {
    return <NoData text="لا توجد مؤسسات حاليا" />;
  }

  console.log(response);


  // const dataSource = [
  //   {
  //     key: "1",
  //     stuName: <StudentDetails/>,
  //     university: "جامعة طيبة",
  //     gpa: "5/4.9",
  //     specialization: "نظم معلومات",
  //     status: "بإنتظار موافقة الطالب",
  //     accept: "-",
  //   },
  //   {
  //     key: "2",
  //     stuName: "فلان فلان الفلاني",
  //     university: "جامعة الملك فهد للبترول و المعادن",
  //     gpa: "4/3.5",
  //     specialization: "هندسة برمجيات",
  //     status: "مرفوض",
  //     accept: "-",
  //   },
  //   {
  //     key: "3",
  //     stuName: "فلان فلان الفلاني",
  //     university: "جامعة الملك سعود",
  //     gpa: "5/4.4",
  //     specialization: "هندسة معمارية",
  //     status: "بإنتظار موافقة المنشأة",
  //     accept: "-",
  //   },
  // ];

  const columns = [
    {
      title: "الاسم",
      dataIndex: "fullName",
      align: "center",
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
      dataIndex: "status",
      align: "center",
      render: TableText
    },
    {
      title: "الإجراء",
      dataIndex: "accept",
      align: "center",
      render: (text, row) => <InstitutionAccept row={row}/>,
    },
  ];

  const filteredDataSource = statusFilter
  ? response.data.data.filter((application) => application.status === statusFilter)
  : response.data.data;


  return (
    <div className="postDetailsContainer">
      <div className="detailsContainer">
        <div className="detailsTable">
          <PostDetailsTable data={data} />
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
          <FontAwesomeIcon className="icon" icon={faFileCsv} />{" "}
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
          onClick={() => handleStatusFilterChange("بإنتظار موافقة المنشأة")}
        >
          بإنتظار موافقة المنشأة
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("بإنتظار موافقة الطالب")}
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
      <TableUI col={columns} data={filteredDataSource} filter={statusFilter} />
    </div>
  );
};

export default InstPostDetails;
