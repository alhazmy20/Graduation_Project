import React from "react";
import { Avatar, Button, Card, Col, Image, List, Row } from "antd";
import Title from "antd/es/typography/Title";
import instPng from "../../../assets/image14.png";
import { DoubleLeftOutlined } from "@ant-design/icons";
const { Meta } = Card;

const data = Array.from({
    length: 25,
  }).map((_, i) => ({
    title: `تعلن سدايا عن موعد بدء التقديم على التدريب التعاوني للترم
     الثاني`,
    avatar: instPng,
    description:
      'منذ 3 أيام',
  }));

const NewsCard = () => {
  return (

    <List
    itemLayout="vertical"
    size="middle"
    bordered

    pagination={{
        onChange: (page) => {
            console.log(page);
        },
        position: "bottom",
        align: "start",
        pageSize: 6,
    }}
    dataSource={data}
    renderItem={(item) => (
        <List.Item>
<Card
            size="small"
            className="NewsCard"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 20px rgba(168, 168, 168, 0.9)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Meta
                style={{
                  width: "fit-content",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                avatar={<Image preview={false} width="11.5rem" src={item.avatar} />}
                className="Meta"
                title={
                  <Title style={{fontSize: "1.25rem"}}>
                    {item.title}
                  </Title>
                }
                description={
                  <Title style={{ color: "#8D8D8D", fontSize: "1rem"}} level={5}>
                    {item.description}
                  </Title>
                }
              />
              <Button
                size="middle"
                type="primary"
                style={{
                  backgroundColor: "#249283",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "1rem"
                }}
                shape="round"
              >
                أظهار التفاصيل
                <DoubleLeftOutlined />
              </Button>
            </div>
          </Card>
        </List.Item>
    )}
    >
    </List>
  );
};

export default NewsCard;
