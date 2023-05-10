import React from "react";
import StatisticCard from "../../../components/ui/StatisticCard/StatisticCard";
import { Col, Row, notification } from "antd";
import StatisticChart from "../../../components/ui/StatisticChart/StatisticChart";
import StatisticTable from "../../../components/ui/StatisticTable/StatisticTable";

import "./ِAdminHomePage.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";

import { useDashboard } from "../../../util/api";
import { useYearState } from "../../../util/helpers";

const SupervisorHomePage = () => {
  const { currentYear, years, selectedYear } = useYearState();
  const { data, loading, error } = useDashboard("cards", "SuperAdmin");

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
    <div className="AdminHomeContiner">
      <Col>
        <Row className="rowStyleStat" gutter={16}>
          <StatisticCard title="عدد المستخدمين" value={data?.total_users} />
          <StatisticCard
            title="عدد الطلاب الجدد"
            value={data?.new_students.current_week_count}
            lable={"طالب"}
            indicators={data?.new_students.percentage_difference}
            indicatorLable="منذ الاسبوع الماضي"
          />
          <StatisticCard
            title="عدد تقديم الطلاب"
            value={data?.new_applications.current_week_count}
            lable={"طلب"}
            indicators={data?.new_applications.percentage_difference}
            indicatorLable="منذ الاسبوع الماضي"
          />
        </Row>
        <Row gutter={16} className="rowStyleStat">
          <StatisticCard
            title="عدد المنشئات الجديدة"
            value={data?.new_institutions.current_week_count}
            lable={"منشأة"}
            indicators={data?.new_institutions.percentage_difference}
            indicatorLable="منذ الاسبوع الماضي"
          />
          <StatisticCard
            title="عدد المنشئات بإنتظار التفعيل "
            value={data?.unactive_institutions}
            lable={"منشأة"}
          />
          <StatisticCard
            title="عدد الفرص التدريبية الجديدة "
            value={data?.new_posts.current_week_count}
            lable={"فرصة تدريبية"}
            indicators={data?.new_posts.percentage_difference}
            indicatorLable="منذ الاسبوع الماضي"
          />
        </Row>
      </Col>
      <Col>
        <Row gutter={20} className="AdmindateDisplay">
          <Col span={9}>
            <StatisticChart
              lable={"احصائيات بناء على الجامعات"}
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
