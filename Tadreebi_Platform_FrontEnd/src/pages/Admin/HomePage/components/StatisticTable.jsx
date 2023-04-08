import React from "react";
import Table from "../../../../components/ui/Table/Table";
import { TableDetailData } from "../../../../data/TestData";
import { useFetch } from "../../../../data/API";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import { notification } from "antd";
import NoData from "../../../../components/ui/NoData/NoData";
const StatisticTable = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/getAllStudentsData"
  );

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
      dataIndex: "studentApplay",
      align: "center",
    },
    {
      title: "عدد التقديمات",
      dataIndex: "totalApplicant",
      align: "center",
    },
  ];

  return <Table data={data} col={columns} Size={4} />;
};

export default StatisticTable;
