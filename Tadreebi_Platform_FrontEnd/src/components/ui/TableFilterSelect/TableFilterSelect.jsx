import React from "react";
import "./TableFilterButtons.scss";
import { Select } from "antd";

const TableFilterButtons = ({ setStatusFilter, isSupervisor }) => {
  const handleStatusFilterChange = (status) => {
    if (status === "الكل") {
      status = "";
    }
    setStatusFilter(status);
  };

  const options = [
    { value: "الكل" },
    ...(isSupervisor
      ? []
      : [
          {
            value: "بإنتظار موافقة المنشأة",
          },
          {
            value: "تم الرفض من قبل المنشأة",
          },
        ]),
    {
      value: "بإنتظار موافقة المشرف الجامعي",
    },
    {
      value: "بإنتظار تأكيد الطالب",
    },
    {
      value: "مقبول",
    },
    {
      value: "تم الرفض من قبل المشرف الجامعي",
    },
    {
      value: "تم الرفض من قبل الطالب",
    },
    {
      value: "تم الغاء الطلب من قبل النظام",
    },
  ];

  return (
    <div className="table-filter-select">
      <Select
        options={options}
        className="filterSelect"
        defaultValue="الكل"
        onChange={(e) => handleStatusFilterChange(e)}
        
      />
    </div>
  );
};

export default TableFilterButtons;
