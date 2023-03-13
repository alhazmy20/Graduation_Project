import React from 'react'
import {Button, Card, Image, List} from "antd";
import Title from "antd/es/typography/Title";
import instPng from "../../../assets/images/image14.png";
import { DoubleLeftOutlined } from "@ant-design/icons";
import "./News.scss"
const { Meta } = Card;

const data = Array.from({
  length: 25,
}).map((_, i) => ({
  title: `تعلن سدايا عن موعد بدء التقديم على التدريب التعاوني للترم
     الثاني`,
  avatar: instPng,
  description: "منذ 3 أيام",
}));

const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>السابق</a>;
  }
  if (type === 'next') {
    return <a>التالي</a>;
  }
  return originalElement;
};

const News = () => {
  return (
     <List
    className="listContainer"
      itemLayout="vertical"
      size="middle"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        responsive: true,
        position: "bottom",
        itemRender: itemRender,
        align: "center",
        pageSize: 6,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
        className="listItemContainer"
        >
          <Card
            size="small"
            className="newsCard"
          >
            <div
              className="metaContainer"
            >
              <Meta
                className="metaDetails"
                avatar={
                  <Image preview={false} className="avatarMeta" src={item.avatar} />
                }
                title={
                  <Title className="metaTitle">{item.title}</Title>
                }
                description={
                  <Title
                    className="metaDescription"
                  >
                    {item.description}
                  </Title>
                }
              />
              <Button
                size="middle"
                type="primary"
                className="newsDetailsBtn"
                shape="round"
              >
                أظهار التفاصيل
                <DoubleLeftOutlined />
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    ></List>
  )
}

export default News