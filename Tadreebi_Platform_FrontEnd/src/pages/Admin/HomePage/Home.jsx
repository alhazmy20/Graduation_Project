import React from "react";
import StatisticCard from "./components/StatisticCard";
import { Col, Row } from "antd";
import StatisticChart from "./components/StatisticChart";
import StatisticTable from "./components/StatisticTable";
import "./AdminHomePage.scss";
const Home = () => {
  return (
    <div
      style={{
        maxWidth: "1848px",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      <Col>
        <Row
          gutter={16}
          style={{ marginTop: "20px", justifyContent: "center" }}
        >
          <StatisticCard
            title="عدد الزائرين الحاليين"
            value={523}
            lable={"زائر"}
          />
          <StatisticCard title="عدد الطلاب الجدد" value={523} lable={"طالب"} />
          <StatisticCard title="عدد تقديم الطلاب" value={523} lable={"طلب"} />
        </Row>
        <Row
          gutter={16}
          style={{ marginTop: "20px", justifyContent: "center" }}
        >
          <StatisticCard
            title="عدد المنشئات الجديدة"
            value={523}
            lable={"منشأة"}
          />
          <StatisticCard
            title="عدد المنشئات بإنتظار التفعيل "
            value={523}
            lable={"منشأة"}
          />
          <StatisticCard
            title="عدد الفرص التدريبية الجديدة "
            value={523}
            lable={"فرصة تدريبية"}
          />
        </Row>
      </Col>

      <Col>
        <Row gutter={20} className="AdmindateDisplay">
          <Col span={12}>
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
