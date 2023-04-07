import React from "react";
import Table from "../../../../components/ui/Table/Table";
import { TableDetailData } from "../../../../data/TestData";
const StatisticTable = () => {
  const columns = [
    {
      title: "الجامعة",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "المنشئات",
      dataIndex: "institution",
      key: "institution",
    },
    {
      title: "الطلاب",
      dataIndex: "student",
      key: "student",
    },
  ];

  return <Table data={TableDetailData} col={columns} Size={3} />;
};

export default StatisticTable;
