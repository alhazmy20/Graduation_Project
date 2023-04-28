import React from "react";
import { Card, Image, Space } from "antd";
import './InfoCard.scss'

const InfoCard = ({ item }) => {
  console.log(item);

  return (
    <Card
      title={<h2 className="card-title">{item.institutionName}</h2>}
      className="info-card"
    >
          <div className="img-container" style={{ width: "100%" }}>
          <Image
          preview={false}
          src={
            item.logo.logo_url ||
            "https://www9.0zz0.com/2023/04/22/07/971570307.png"
          }
          alt=""
          width={100}
          height={100}
          loading="lazy"
        />
          </div>
    </Card>
  );
};

export default InfoCard;
