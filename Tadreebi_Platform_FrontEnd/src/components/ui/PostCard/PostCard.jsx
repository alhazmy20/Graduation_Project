import React from "react";
import { Button, Card, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import "./PostCard.scss";

const PostCard = (props) => {
  const { item } = props;
  return (
    <Card
      title={<h2 className="card-title">{item.title}</h2>}
      className="post-card"
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <div className="majors">
          {item.majors.map((major) => (
            <span key={major.id} className="major">
              {major.major}
            </span>
          ))}
        </div>
        <div className="details-container">
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faCity} />
            <span className="label">المدينة:</span>
            <span className="data">{item.city}</span>
          </div>
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faCity} />
            <span className="label">الجنس:</span>
            <span className="data">{item.title}</span>
          </div>
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faCity} />
            <span className="label">مكافأة:</span>
            <span className="data">{item.title}</span>
          </div>
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faCity} />
            <span className="label">تاريخ الإنتهاء:</span>
            <span className="data">{item.title}</span>
          </div>
        </div>
        <Button type="primary" className="more-detail-btn">
          عرض التفاصيل
        </Button>
      </Space>
    </Card>
  );
};

export default PostCard;
