import { ConfigProvider, Table } from "antd";
import "./AppTable.scss";
import { itemRender } from "../../../components/ui/Pagination";
import { useState } from "react";
import { Button } from "antd";

const AppTable = () => {
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
            <span>
              {<Button className="acc">قبول</Button>}
              {<Button className="reject">رفض</Button>}
            </span>
          );
        } else if (
          row.status === "بإنتظار موافقة المنشأة" ||
          row.status === "مرفوض" ||
          row.status === "مقبول"
        ) {
          buttons = <span>-</span>;
        }
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
    <div className="AppTable">
      <h1 className="header">طلبات التقديم</h1>
      <div className="ss">
        <Button
          className="label button-filter"
          onClick={() => handleStatusFilterChange("")}
        >
          الكل
        </Button>
        <Button
          className="label button-filter"
          onClick={() => handleStatusFilterChange("بإنتظار موافقة المنشأة")}
        >
          بإنتظار موافقة المنشأة
        </Button>
        <Button
          className="label button-filter"
          onClick={() => handleStatusFilterChange("بإنتظار موافقة الطالب")}
        >
          بإنتظار موافقة الطالب
        </Button>
        <Button
          className="label button-filter"
          onClick={() => handleStatusFilterChange("مقبول")}
        >
          مقبول
        </Button>
        <Button
          className="label button-filter"
          onClick={() => handleStatusFilterChange("مرفوض")}
        >
          مرفوض
        </Button>
      </div>
      <p className="tex">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {dataSource.length}{" "}
        سجل
      </p>
      <Table
        classname="tab"
        dataSource={filteredDataSource}
        columns={columns}
        pagination={{
          onChange: handlePaginationChange,
          responsive: true,
          itemRender: itemRender,
          pageSize: pageSize,
          position: ["bottomLeft"],
        }}
      />
    </div>
  );
};

export default AppTable;
