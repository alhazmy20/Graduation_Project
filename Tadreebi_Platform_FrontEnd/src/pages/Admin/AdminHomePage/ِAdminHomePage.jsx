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
          <StatisticCard title="عدد المستخدمين" value={data?.totalUsers} />
          <StatisticCard
            title="عدد الطلاب الجدد"
            value={data?.newStudents?.currentWeekCount}
            lable={"طالب"}
            indicators={data?.newStudents?.percentageDifference}
            indicatorLable="منذ الاسبوع الماضي"
          />
          <StatisticCard
            title="عدد المشرفيين الجامعيين الجدد"
            value={data?.newSupervisors?.currentWeekCount}
            lable={"مشرف جامعي"}
            indicators={data?.newSupervisors?.percentageDifference}
            indicatorLable="منذ الاسبوع الماضي"
          />
        </Row>
        <Row gutter={16} className="rowStyleStat">
          <StatisticCard
            title="عدد المنشئات الجديدة"
            value={data?.newInstitutions?.currentWeekCount}
            lable={"منشأة"}
            indicators={data?.newInstitutions?.percentageDifference}
            indicatorLable="منذ الاسبوع الماضي"
          />
          <StatisticCard
            title="عدد المنشئات بإنتظار التفعيل "
            value={data?.unactiveInstitutions}
            lable={"منشأة"}
          />
          <StatisticCard
            title="عدد الفرص التدريبية الجديدة "
            value={data?.newPosts?.currentWeekCount}
            lable={"فرصة تدريبية"}
            indicators={data?.newPosts?.percentageDifference}
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
