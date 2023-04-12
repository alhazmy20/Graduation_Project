import React, { useState } from "react";
import StatisticCard from "./components/StatisticCard";
import { Col, Row, notification } from "antd";
import StatisticChart from "./components/StatisticChart";
import StatisticTable from "./components/StatisticTable";
import { useFetch } from "../../../data/API";
import "./Home.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";
const Home = () => {
  const { data, loading, error } = useFetch(`http://localhost:8000/adminStat`);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const { data: cardStatInfo } = data;

  return (
    <div className="AdminHomeContiner">
      <Col>
        <Row className="rowStyleStat" gutter={16}>
          <StatisticCard
            title="عدد الطلاب"
            value={cardStatInfo.total_users}
            lable={"زائر"}
          />
          <StatisticCard
            title="عدد الطلاب الجدد"
            value={cardStatInfo.new_students.current_week_count}
            lable={"طالب"}
            indicators={cardStatInfo.new_students.percentage_difference}
            indicatorLable="منذ الاسبوع الماضي"
          />
          <StatisticCard
            title="عدد تقديم الطلاب"
            value={cardStatInfo.new_applications.current_week_count}
            lable={"طلب"}
            indicators={cardStatInfo.new_applications.percentage_difference}
            indicatorLable="منذ الاسبوع الماضي"
          />
        </Row>
        <Row gutter={16} className="rowStyleStat">
          <StatisticCard
            title="عدد المنشئات الجديدة"
            value={cardStatInfo.new_institutions.current_week_count}
            lable={"منشأة"}
            indicators={cardStatInfo.new_institutions.percentage_difference}
            indicatorLable="منذ الاسبوع الماضي"
          />
          <StatisticCard
            title="عدد المنشئات بإنتظار التفعيل "
            value={cardStatInfo.unactive_institutions}
            lable={"منشأة"}
          />
          <StatisticCard
            title="عدد الفرص التدريبية الجديدة "
            value={cardStatInfo.new_posts.current_week_count}
            lable={"فرصة تدريبية"}
            indicators={cardStatInfo.new_posts.percentage_difference}
            indicatorLable="منذ الاسبوع الماضي"
          />
        </Row>
      </Col>

      <Col>
        <Row gutter={20} className="AdmindateDisplay">
          <Col span={9}>
            <StatisticChart />
          </Col>
          <Col span={9}>
            <StatisticTable />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Home;
