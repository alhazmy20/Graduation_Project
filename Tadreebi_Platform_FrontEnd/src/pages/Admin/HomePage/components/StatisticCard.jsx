import React from "react";
import { Card, Col } from "antd";
import "./StatisticCard.scss";

const StatisticCard = (props) => {
  const { title, value, lable, indicators } = props;
  return (
    <Col span={6}>
      <Card bordered={true} hoverable className="cardContinerStat">
        <span className="tisyle">{title}</span>
        <div className="statcont">
          <span className="spStyle">{value}</span>
          <span className="spStyle">{lable}</span>
        </div>
        <span>{}</span>
      </Card>
    </Col>
  );
};

export default StatisticCard;
