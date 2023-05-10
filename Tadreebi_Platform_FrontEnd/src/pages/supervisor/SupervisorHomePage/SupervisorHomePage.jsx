import React from "react";
import "./SupervisorHomePage.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";
import StatisticChart from "../../../components/ui/StatisticChart/StatisticChart";
import StatisticTable from "../../../components/ui/StatisticTable/StatisticTable";
import StatisticCard from "../../../components/ui/StatisticCard/StatisticCard";
import { Col, Row, notification } from "antd";
import { useDashboard } from "../../../util/api";
import { useAuth } from "../../../auth/useContext";

import { useYearState } from "../../../util/helpers";
const SupervisorHomePage = () => {
  const { data, loading, error } = useDashboard("cards", "Supervisor");
  const { currentYear, years, selectedYear } = useYearState();
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className="SupervisorHomeContiner">
      <Col>
        <Row className="rowStyleStat" gutter={16}>
          <StatisticCard
            title="عدد الطلاب و الطالبات"
            value={data?.totalStudents}
          />
          <StatisticCard title="عدد الطلاب " value={data?.maleStudents} />
          <StatisticCard title="عدد  الطالبات" value={data?.femaleStudents} />
        </Row>
      </Col>

      <Col>
        <Row gutter={20} className="AdmindateDisplay">
          <Col span={9}>
            <StatisticChart
              lable={"احصائيات بناء على الطلبات"}
              years={years}
              currentYear={currentYear}
            />
          </Col>
          <Col span={9}>
            <StatisticTable years={selectedYear} />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default SupervisorHomePage;
