import React from "react";
import "./TableFilterButtons.scss";
import { Button } from "antd";

const TableFilterButtons = ({ setStatusFilter }) => {
  const handleStatusFilterChange = (status) => {
    console.log(status);
    setStatusFilter(status);
  };
  return (
    <div className="table-filter-buttons">
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
        onClick={() => handleStatusFilterChange("بإنتظار موافقة المشرف الجامعي")}
      >
      بإنتظار موافقة المشرف الجامعي
      </Button>
      <Button
        className="button-filter"
        onClick={() => handleStatusFilterChange("بإنتظار تأكيد الطالب")}
      >
        بإنتظار تأكيد الطالب
      </Button>
      <Button
        className="button-filter"
        onClick={() => handleStatusFilterChange("تم الرفض من قبل المنشأة")}
      >
        مرفوض من قبل المنشأة
      </Button>
      <Button
        className="button-filter"
        onClick={() =>
          handleStatusFilterChange("تم الرفض من قبل المشرف الجامعي")
        }
      >
        مرفوض من قبل المشرف الجامعي
      </Button>
      <Button
        className="button-filter"
        onClick={() => handleStatusFilterChange("مقبول")}
      >
        مقبول
      </Button>
      <Button
        className="button-filter"
        onClick={() => handleStatusFilterChange("تم الغاء الطلب")}
      >
        ملغي
      </Button>
    </div>
  );
};

export default TableFilterButtons;
