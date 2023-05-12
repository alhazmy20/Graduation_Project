import React from "react";
import "./SupervisorHomePage.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";
import StatisticChart from "../../../components/ui/StatisticChart/StatisticChart";
import { Col, Row, notification } from "antd";
import { useDashboard } from "../../../util/api";
import { useAuth } from "../../../auth/useContext";

import { useYearState } from "../../../util/helpers";
const SupervisorHomePage = () => {
  const { currentYear, years, selectedYear } = useYearState();
  const { data, loading, error } = useDashboard(
    useAuth?.auth?.user?.role,
    years
  );
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  if (!data) {
    return <Spinner />;
  }

  const chartData = [
    { value: data?.chart?.applicationsApproved, name: "تم المواففة عليهم" },
    { value: data?.chart?.applicationsRejected, name: "تم الرفض" },
    {
      value: data?.chart?.applicationsWaitingToBeApproved,
      name: " بإنتظار الموافقة ",
    },
  ];
  const cardsData = [
    { value: data?.cards?.totalStudents, name: "تم المواففة عليهم" },
    { value: data?.cards?.maleStudents, name: "تم الرفض" },
    { value: data?.cards?.femaleStudents, name: " بإنتظار الموافقة " },
  ];

  return (
    <div className="SupervisorHomeContiner">
      <Col>
        <Row gutter={20} className="SupervisordateDisplay">
          <Col span={9}>
            <StatisticChart
              lable={"احصائيات بناء على الطلبات"}
              years={years}
              setData={chartData}
              currentYear={currentYear}
              type={"pie"}
            />
          </Col>
          <Col span={9}>
            <StatisticChart
              lable={"احصائيات بناء على الطلاب والطالبات"}
              years={years}
              setData={cardsData}
              currentYear={currentYear}
              type={"bar"}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default SupervisorHomePage;
