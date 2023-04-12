import React from "react";
import { Card, Col } from "antd";
import "./StatisticCard.scss";

const StatisticCard = (props) => {
  const { title, value, lable, indicators, indicatorLable } = props;

  const handleColorChnage = () => {
    if (indicators && indicators.includes("-")) {
      return "red";
    }
    return "green";
  };
  return (
    <Col span={6}>
      <Card bordered={true} hoverable className="cardContinerStat">
        <span className="tisyle">{title}</span>
        <div className="statcont">
          <span className="spStyle">{value}</span>
          <span className="spStyle">{lable}</span>
        </div>
        <div>
          {" "}
          <span
            style={{ color: handleColorChnage(), marginLeft: "10px" }}
            dir="ltr"
          >
            {indicators}
          </span>
          {indicatorLable}
        </div>
      </Card>
    </Col>
  );
};

export default StatisticCard;
