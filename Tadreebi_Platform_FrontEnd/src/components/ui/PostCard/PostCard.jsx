import React from "react";
import { Button, Card, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faTransgender,
  faDollar,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import "./PostCard.scss";
import { useNavigate } from "react-router-dom";

const PostCard = ({data}) => {
  const navigate = useNavigate();
  console.log(data);

  return (
    <Card
      title={<h2 className="card-title">{data.title}</h2>}
      className="post-card"
    >
      <Space direction="vertical" size="large" className="space-tag">
        <div className="majors">
          {data.post_majors?.map((major, index) => (
            <span key={index} className="major">
              {" "}
              {/*NOTE Add the id to key like 'key={major.id} */}
              {major.major}
            </span>
          ))}
        </div>
        <div className="details-container">
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faCity} />
            <span className="label">المدينة:</span>
            <span className="data">{data.city}</span>
          </div>
          <div className="detail">
            <FontAwesomeIcon className="icon" icon={faTransgender} />
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
            <span className="label">تاريخ الإنتهاء:</span>
            <span className="data">{data.subEndDate}</span>
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
