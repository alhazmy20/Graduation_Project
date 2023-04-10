import React from "react";
import StatisticCard from "./components/StatisticCard";
import { Col, Row, notification } from "antd";
import StatisticChart from "./components/StatisticChart";
import StatisticTable from "./components/StatisticTable";
import { useFetch } from "../../../data/API";
import "./AdminHomePage.scss";
import Spinner from "../../../components/ui/Spinner/Spinner";
const Home = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/adminStat");

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  return (
    <div className="AdminHomeContiner">
      <Col>
        <Row className="rowStyleStat" gutter={16}>
          <StatisticCard
            title="عدد الطلاب"
            value={data.StudnetNum}
            lable={"زائر"}
          />
          <StatisticCard
            title="عدد الطلاب الجدد"
            value={data.NewStudent}
            lable={"طالب"}
          />
          <StatisticCard
            title="عدد تقديم الطلاب"
            value={data.StudnetSubmission}
            lable={"طلب"}
          />
        </Row>
        <Row gutter={16} className="rowStyleStat">
          <StatisticCard
            title="عدد المنشئات الجديدة"
            value={data.NewInstitution}
            lable={"منشأة"}
          />
          <StatisticCard
            title="عدد المنشئات بإنتظار التفعيل "
            value={data.Inactive}
            lable={"منشأة"}
          />
          <StatisticCard
            title="عدد الفرص التدريبية الجديدة "
            value={data.NewPost}
            lable={"فرصة تدريبية"}
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
