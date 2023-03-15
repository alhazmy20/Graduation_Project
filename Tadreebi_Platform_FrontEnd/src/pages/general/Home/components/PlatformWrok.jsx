import React from "react";
import searchImg from "../../../../assets/images/Search.png";
import NearMeImg from "../../../../assets/images/NearMe.png";
import MaleUserImg from "../../../../assets/images/MaleUser.png";
import "./PlatformWrok.scss";
import { Card } from "antd";
const { Meta } = Card;
const PlatformWrok = () => {
  return (
    <div className="WrokMain">
      <div className="title"> كيف تعمل منصة تدريبي؟</div>
      <div className="platformCard">
        <Card
          className="cardContent"
          hoverable
          cover={<img alt="example" src={searchImg} />}
        >
          <Meta className="cardDesc" title="ابحث عن فرص التدريب" />
        </Card>
        <Card
          className="cardContent"
          hoverable
          cover={<img alt="example" src={MaleUserImg} />}
        >
          <Meta className="cardDesc" title="سجل معنا" />
        </Card>
        <Card
          className="cardContent"
          hoverable
          cover={<img alt="example" src={NearMeImg} />}
        >
          <Meta className="cardDesc" title="قدم طلب التحاق" />
        </Card>
      </div>
    </div>
  );
};

export default PlatformWrok;
