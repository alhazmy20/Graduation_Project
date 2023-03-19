import { ConfigProvider, Table } from "antd";
import "./AppTable.scss";
import { itemRender } from "../../../components/ui/Pagination";
import { useState } from "react";
import { Button } from "antd";
import SmallTable from "./components/SmallTable";

const AppTable = () => {
  const dataSource = [
    {
      key: "1",
      instname: "بإنتظار موافقة الطالب",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "بإنتظار موافقة الطالب",
      accept: "-",
    },
    {
      key: "2",
      instname: "بإنتظار موافقة الطالب",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "مرفوض",
      accept: "-",
    },
    {
      key: "3",
      instname: "بإنتظار موافقة الطالب",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "بإنتظار موافقة المنشأة",
      accept: "-",
    },
    {
      key: "4",
      instname: "بإنتظار موافقة الطالب",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "مرفوض",
      accept: "-",
    },
    {
      key: "5",
      instname: "بإنتظار موافقة الطالب",
      opp: "xxxxx",
      date: "تدريب تعاوني - تطوير تطبيقات الويب",
      status: "بإنتظار موافقة الطالب",
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
          row.status === "مرفوض"
        ) {
          buttons = <span>-</span>;
        }
        return buttons;
      },
    },
  ];

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
      <SmallTable></SmallTable>
      <p className="tex">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {dataSource.length}{" "}
        سجل
      </p>
      <Table
        classname="tab"
        dataSource={dataSource}
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
