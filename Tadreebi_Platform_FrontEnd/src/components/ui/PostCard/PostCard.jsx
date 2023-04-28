import React from "react";
import { Button, Card, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faVenusMars,
  faDollar,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import "./PostCard.scss";
import { useNavigate } from "react-router-dom";

const PostCard = ({ data }) => {
  const navigate = useNavigate();
  const MAX_DISPLAY = 5;

  return (
    <Card
      title={<h2 className="card-title">{data.title}</h2>}
      className="post-card"
    >
      <Space direction="vertical" size="large" className="space-tag">
        <div className="majors">
          {data.post_majors?.slice(0, MAX_DISPLAY).map((major, index) => (
            <span key={index} className="major">
              {major.major}
            </span>
          ))}
          {data.post_majors?.length > MAX_DISPLAY && (
            <span className="major">
              +{data.post_majors.length - MAX_DISPLAY}
            </span>
          )}
        </div>

        <div className="details-container">
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faCity} />
            <span className="label">المدينة:</span>
            <span className="data">{data.city}</span>
          </div>
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faVenusMars} />
            <span className="label">الجنس:</span>
            <span className="data">{data.gender}</span>
          </div>
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faDollar} />
            <span className="label">مكافأة:</span>
            <span className="data">{data.reward}</span>
          </div>
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faCalendar} />
            <span className="label">تاريخ نهاية التقديم:</span>
            <span className="data">{data.p_endDate}</span>
          </div>
        </div>
        <Button
          type="primary"
          className="more-detail-btn"
          onClick={() => {
            navigate(`/training-opportunities/${data.id}`);
          }}
        >
          عرض التفاصيل
        </Button>
      </Space>
    </Card>
  );
};

export default PostCard;
