import React from "react";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { notification } from "antd";
import { useDashboard } from "../../../util/api";
import { useAuth } from "../../../auth/useContext";
const StatisticTable = ({ years }) => {
  const auth = useAuth();
  const isAdmin = auth.user?.role;
  const { data, loading, error } = useDashboard(isAdmin, years);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  if (!data) {
    return <Spinner />;
  }

  const columnAdmin = [
    {
      title: "الجامعة",
      dataIndex: "university",
      align: "center",
    },
    {
      title: "الطلاب",
      dataIndex: "totalStudents",
      align: "center",
    },
    {
      title: "عدد التقديمات",
      dataIndex: "totalApplications",
      align: "center",
    },
  ];

  // const columnsSuperVisor = [
  //   {
  //     title: " بإنتظار الموافقة",
  //     dataIndex: "applicationsWaitingToBeApproved",
  //     align: "center",
  //   },
  //   {
  //     title: "تم المواففة عليهم",
  //     dataIndex: "applicationsApproved",
  //     align: "center",
  //   },
  //   {
  //     title: "تم الرفض",
  //     dataIndex: "applicationsRejected",
  //     align: "center",
  //   },
  // ];

  return <Table data={data?.chart} col={columnAdmin} Size={4} />;
};

export default StatisticTable;
