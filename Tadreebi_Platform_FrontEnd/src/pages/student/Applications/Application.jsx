import "./Application.scss";
import { useState } from "react";
import { Button, notification } from "antd";
import Table from "../../../components/ui/Table/Table";
import {
  StudentAccept,
  TableText,
} from "../../../components/ui/Table/TableFilter";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useFetch } from "../../../data/API";
import NoData from "../../../components/ui/NoData/NoData";

const Application = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/studentPosts");
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
    return <NoData text="لا يوجد طلاب حاليا" />;
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
      title: "الفرصة التدريبية",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "تاريخ التقديم",
      dataIndex: "t_startDate",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "postStatus",
      align: "center",
      render: TableText,
    },
    {
      title: "الإجراء",
      dataIndex: "accept",
      align: "center",
      render: (text, row) => {
        return <StudentAccept row={row} />;
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
      <p className="rangeText">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {studentsData.length}{" "}
        سجل
      </p>
      <Table
        col={columns}
        data={filteredDataSource}
        filter={statusFilter}
        Size={pageSize}
        handleChange={handlePaginationChange}
        emptyText="لا توجد بيانات"
      />
    </div>
  );
};

export default Application;
