import React from "react";
import { Button, Card, List, Row, Space, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import "./PostCard.scss";

const data = [
  {
    title: "شركة التقنيات الحديثة",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
];

const PostCard = () => {
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>السابق</a>;
    }
    if (type === "next") {
      return <a>التالي</a>;
    }
    return originalElement;
  };
  return (
    <List
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
              style={{ minHeight: 300 }}
              bodyStyle={{ height: "100%", overflow: "auto" }}
              autoSize={{ minRows: 3, maxRows: 10 }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <div className="majors">
                  <span className="major">نظم المعلومات</span>
                  <span className="major">علوم الحاسب</span>
                  <span className="major">هندسة البرمجيات</span>
                  <span className="major">تقنية المعلومات</span>
                </div>
                <div className="details-container">
                  <div className="detail">
                    <FontAwesomeIcon className="icon" icon={faCity} />
                    <span className="label">المدينة:</span>
                    <span className="data">المدينة المنورة</span>
                  </div>
                  <div className="detail">
                    <FontAwesomeIcon className="icon" icon={faCity} />
                    <span className="label">المدينة:</span>
                    <span className="data">المدينة المنورة</span>
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
