
import "./Application.scss";
import { useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";

const Application = () => {
  const dataSource = [
    {
      key: "1",
      instname: "xxxxx",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "بإنتظار موافقة الطالب",
      accept: "-",
    },
    {
      key: "2",
      instname: "xxxx",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "مرفوض",
      accept: "-",
    },
    {
      key: "3",
      instname: "xxxx",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "بإنتظار موافقة المنشأة",
      accept: "-",
    },
    {
      key: "4",
      instname: "xxxx",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "مرفوض",
      accept: "-",
    },
    {
      key: "5",
      instname: "xxxx",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "بإنتظار موافقة الطالب",
      accept: "-",
    },
    {
      key: "6",
      instname: "xxxx",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "مقبول",
      accept: "-",
    },
  ];

  const columns = [
    {
      title: "اسم المؤسسة",
      dataIndex: "instname",
      align: "center",
    },
    {
      title: "الفرصة التدريبية",
      dataIndex: "opp",
      align: "center",
    },
    {
      title: "تاريخ التقديم",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        let style = {};
        if (
          text === "بإنتظار موافقة الطالب" ||
          text === "بإنتظار موافقة المنشأة"
        ) {
          style.color = "#F9C068";
        } else if (text === "مرفوض") {
          style.color = "red";
        } else if (text === "مقبول") {
          style.color = "#008374b2";
        }
        return <span style={style}>{text}</span>;
      },
    },
    {
      title: "الإجراء",
      dataIndex: "accept",
      align: "center",
      render: (text, row) => {
        let buttons = {};
        let style = {};
        if (row.status === "بإنتظار موافقة الطالب") {
          buttons = (
            <span className="btnContainer">
              {<Button className="acceptBtn">قبول</Button>}
              {<Button className="rejectBtn">رفض</Button>}
            </span>
          );
        } else
          buttons = <span>-</span>;
        return buttons;
      },
    },
  ];

  const [statusFilter, setStatusFilter] = useState(null);
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };
  const filteredDataSource = statusFilter
    ? dataSource.filter((application) => application.status === statusFilter)
    : dataSource;

  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, dataSource.length);
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
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {dataSource.length}{" "}
        سجل
      </p>
      <Table col={columns} data={filteredDataSource} filter={statusFilter} Size={pageSize} handleChange={handlePaginationChange}/>
    </div>
  );
};

export default Application;
