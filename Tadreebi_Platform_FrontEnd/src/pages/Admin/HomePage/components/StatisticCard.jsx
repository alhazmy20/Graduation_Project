import React from "react";

import { Card, Col } from "antd";

import "./StatisticCard.scss";
const tisytle = { fontSize: "14px", width: "100%", color: "#8392AB" };

const StatisticCard = (props) => {
  const { title, value, valueStyle, prefix, precision, suffix, lable } = props;
  return (
    <Col span={6}>
      <Card bordered={true} hoverable className="cardContinerStat">
        <span style={tisytle}>{title}</span>
        <div className="statcont">
          <span className="spStyle">{value}</span>
          <span className="spStyle">{lable}</span>
        </div>
      </Card>
    </Col>
  );
};

export default StatisticCard;
