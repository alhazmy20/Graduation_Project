import React from "react";
import Table from "../../../../components/ui/Table/Table";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import { notification } from "antd";
import { useAdminDashboard } from "../../../../util/api";



const StatisticTable = ({ years }) => {
  const { data, loading, error } = useAdminDashboard("chart", years);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const columns = [
    {
      title: "الجامعة",
      dataIndex: "university",
      align: "center",
    },
    {
      title: "الطلاب",
      dataIndex: "total_students",
      align: "center",
    },
    {
      title: "عدد التقديمات",
      dataIndex: "total_applications",
      align: "center",
    },
  ];

  return <Table data={data} col={columns} Size={4} />;
};

export default StatisticTable;
