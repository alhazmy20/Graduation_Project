import React from "react";
import { Button, Card, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import "../../../../components/ui/PostCard/PostCard.scss";
import { useNavigate } from "react-router-dom";
import testimg from "../../../../assets/images/samiadvancedel.png";

const InfoCard = (props) => {
  const { item } = props;
  const navigate = useNavigate();

  return (
    <Card
      title={<h2 className="card-title">{item.title}</h2>}
      className="post-card"
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <div className="details-container">
          <div className="detail" style={{ width: "100%" }}>
            <img
              style={{ objectFit: "cover", width: "100%" }}
              src={testimg}
            ></img>
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default InfoCard;
