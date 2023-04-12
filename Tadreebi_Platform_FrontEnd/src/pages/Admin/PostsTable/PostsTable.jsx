import React from 'react'
import { useState } from "react";
import { Button, notification, Switch } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../../../data/API";
import NoData from "../../../components/ui/NoData/NoData";
import { AdminInstitutionText, PostDelete} from "../../../components/ui/Table/TableFilter";


const PostsTable = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/adminPosts"
  );
  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  if (!data) {
    return <NoData text="لا توجد اعلانات حاليا" />;
  }

  const {
    data: { data: studentsData },
  } = data;

  const filteredDataSource = statusFilter
    ? studentsData.filter((application) => application.postStatus === statusFilter)
    : studentsData;

  const columns = [
    {
      title: "اسم المؤسسة",
      dataIndex: "inst",
      align: "center",
    },
    {
      title: "اسم الاعلان",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "تاريخ النشر",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "postStatus",
      align: "center",
      render: AdminInstitutionText
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        // let buttons = {};
        // buttons = (
        //   <span>
        //     <span onClick={() => handleDelete(`${record.title}`)}>
        //       {
        //         <FontAwesomeIcon
        //           icon={faTrash}
        //           style={{ color: "red", cursor: "pointer" }}
        //         />
        //       }
        //     </span>
        //     {selectedNews && (
        //       <PostsModal
        //         modalOpen={isModalOpen}
        //         setModalOpen={setIsModalOpen}
        //         name={selectedNews}
        //       />
        //     )}
        //   </span>
        // );
        // return buttons;
         return <PostDelete del={true} record={record}/>
      },
    },
  ];


  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, studentsData.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };
  return (
    <div className="tableContainer">
    <div className="excelContainer">
      <Button className="excelBtn">
        <FontAwesomeIcon className="icon" icon={faFileCsv} />{" "}
        <strong>Excel</strong>
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
        onClick={() => handleStatusFilterChange("نشط")}
      >
        الاعلانات النشطة
      </Button>
      <Button
        className="button-filter"
        onClick={() => handleStatusFilterChange("غير نشط")}
      >
        الاعلانات الغير نشطة
      </Button>
    </div>
    <p className="rangeText">
      عرض {currentRange[0]} إلى {currentRange[1]} من أصل {studentsData.length}{" "}
      سجل
    </p>
    <Table
      col={columns}
      data={filteredDataSource}
      Size={pageSize}
      handleChange={handlePaginationChange}
      emptyText="لا توجد بيانات"
    />
  </div>
  )
}

export default PostsTable