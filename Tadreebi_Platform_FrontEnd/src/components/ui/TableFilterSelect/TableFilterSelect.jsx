import React from "react";
import "./TableFilterButtons.scss";
import { Button, Select } from "antd";
import FormSelect from "../../form/FormSelect";

const TableFilterButtons = ({ setStatusFilter }) => {
  const handleStatusFilterChange = (status) => {
    if (status === "الكل") {
      status = "";
    }
    setStatusFilter(status);
  };

  const options = [
    {
      value: "الكل",
    },
    {
      value: "بإنتظار موافقة المنشأة",
    },
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
      value: "تم الرفض من قبل المنشأة",
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
    <div className="table-filter-buttons">
      <span>تصفية على حسب: </span>
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
