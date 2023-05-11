import React from "react";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { notification } from "antd";
import { useDashboard } from "../../../util/api";
import { useAuth } from "../../../auth/useContext";
const StatisticTable = ({ years }) => {
  const auth = useAuth();
  const isAdmin = auth.user?.role;
  const { data, loading, error } = useDashboard("chart", isAdmin, years);
  console.log(data);
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

  const columnsSuperVisor = [
    {
      title: " بإنتظار الموافقة",
      dataIndex: "applicationsWaitingToBeApproved",
      align: "center",
    },
    {
      title: "تم المواففة عليهم",
      dataIndex: "applicationsApproved",
      align: "center",
    },
    {
      title: "تم الرفض",
      dataIndex: "applicationsRejected",
      align: "center",
    },
  ];

  return (
    <Table
      data={isAdmin === "Supervisor" ? [data] : data}
      col={isAdmin === "Supervisor" ? columnsSuperVisor : columnAdmin}
      Size={4}
    />
  );
};

export default StatisticTable;
