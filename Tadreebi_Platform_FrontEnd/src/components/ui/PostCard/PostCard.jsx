import React from "react";
import { Button, Card, List, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import "./PostCard.scss";
import { data } from "../../../data/TestData.js";
import {itemRender} from "../Pagination.js";

const PostCard = () => {
  return (
    <List
      className="post-list"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        responsive: true,
        position: "bottom",
        itemRender: itemRender,
        align: "center",
        pageSize: 8,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            title={<h2 className="card-title">{item.title}</h2>}
            className="post-card"
          >
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
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
        </List.Item>
      )}
    />
  );
};

export default PostCard;
