import React from "react";
import StatisticCard from "../../../components/ui/StatisticCard/StatisticCard";
import { Col, Row, notification } from "antd";
import StatisticChart from "../../../components/ui/StatisticChart/StatisticChart";
import StatisticTable from "../../../components/ui/StatisticTable/StatisticTable";

import "./ِAdminHomePage.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";

import { useDashboard } from "../../../util/api";
import { useYearState } from "../../../util/helpers";

const AdminHomePage = () => {
  const { currentYear, years, selectedYear } = useYearState();
  const { data, loading, error } = useDashboard("SuperAdmin", years);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  if (!data) {
    return <Spinner />;
  }
  const chartData = data?.chart?.map(({ university, totalApplications }) => ({
    name: university,
    value: totalApplications,
  }));

  return (
    <div className="AdminHomeContiner">
      <Col>
        <Row className="rowStyleStat" gutter={16}>
          <StatisticCard
            title="عدد الطلاب"
            value={data?.cards?.totalStudents}
          />
          <StatisticCard
            title="عدد المنشئات  "
            value={data?.cards?.totalInstitutions}
          />

          <StatisticCard
            title="عدد المشرفين "
            value={data?.cards?.totalInstitutions}
          />
        </Row>
        <Row gutter={16} className="rowStyleStat">
          <StatisticCard
            title="عدد الطلاب الجدد"
            value={data?.cards?.newStudents?.currentWeekCount}
            lable={"طالب"}
            indicators={data?.cards?.newStudents?.percentageDifference}
            indicatorLable="منذ الاسبوع الماضي"
          />

          <StatisticCard
            title="عدد المنشئات بإنتظار التفعيل "
            value={data?.cards?.unactiveInstitutions}
            lable={"منشأة"}
          />
          <StatisticCard
            title="عدد المشرفيين الجامعيين الجدد"
            value={data?.cards?.newSupervisors?.currentWeekCount}
            indicators={data?.cards?.newSupervisors?.percentageDifference}
            lable={"مشرف"}
            indicatorLable="منذ الاسبوع الماضي"
          />
        </Row>
        <Row gutter={16} className="rowStyleStat">
          <StatisticCard
            title="عدد الفرص التدريبية الجديدة "
            value={data?.cards?.newPosts?.currentWeekCount}
            lable={"فرصة تدريبية"}
            indicators={data?.cards?.newPosts?.percentageDifference}
            indicatorLable="منذ الاسبوع الماضي"
          />
          <StatisticCard
            title="عدد المنشئات الجديدة"
            value={data?.cards?.newInstitutions?.currentWeekCount}
            lable={"منشأة"}
            indicators={data?.cards?.newInstitutions?.percentageDifference}
            indicatorLable="منذ الاسبوع الماضي"
          />

          <StatisticCard
            title="اخر الاخبار"
            value={data?.cards?.newNews?.currentWeekCount}
            indicators={data?.cards?.newNews?.percentageDifference}
            indicatorLable="منذ الاسبوع الماضي"
          />
        </Row>
      </Col>
      <Col>
        <Row gutter={20} className="AdmindateDisplay">
          <Col span={9}>
            <StatisticChart
              lable={"التقديمات بناء على الجامعات"}
              years={years}
              currentYear={currentYear}
              setData={chartData}
              type={"pie"}
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

export default AdminHomePage;
