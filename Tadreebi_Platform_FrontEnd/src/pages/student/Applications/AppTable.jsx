import { Table } from "antd";
import "./AppTable.scss";
import { itemRender } from "../../../components/ui/Pagination"
import { useState } from "react";

const AppTable = () => {
  
  const dataSource = [
    {
      key: "1",
      appstat: "نشط",
      instname: "xxxxx",
      appname: "تدريب تعاوني - تطوير تطبيقات الويب",
      appdate: "18/01/2023",
    },
    {
      key: "2",
      appstat: "مرفوض",
      instname: "تدريب تعاوني - تدريب صيفي",
      appname: "xxxx",
      appdate: "2023",
    },
    {
      key: "3",
      appstat: "تم القبول",
      instname: "xxxxx",
      appname: "xxxxxx",
      appdate: "2023",
    },
    {
      key: "4",
      appstat: "تم القبول",
      instname: "xxxxx",
      appname: "xxxxxx",
      appdate: "2023",
    },
    {
      key: "5",
      appstat: "تم القبول",
      instname: "xxxxx",
      appname: "xxxxxx",
      appdate: "2023",
    },
  ];
  
  const columns = [
    {
      title: "تاريخ الطلب",
      dataIndex: "appdate",
      align: "center",
    },
    {
      title: "اسم الطلب",
      dataIndex: "appname",
      align: "center",
    },
    {
      title: "اسم الشركة",
      dataIndex: "instname",
      align: "center",
    },
    {
      title: "حالة الطلب",
      dataIndex: "appstat",
      align: "center",
      render: (text) => {
        let style = {};
        if (text === "نشط" || text === "تم القبول") {
          style.color = "#008374B2";
        } else if (text === "مرفوض") {
          style.color = "red";
        }
        return <span style={style}>{text}</span>;
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
      <p className="tex">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {dataSource.length} سجل
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
          position: ['bottomLeft'],
        }}
      />
    </div>
  );
};

export default AppTable;
