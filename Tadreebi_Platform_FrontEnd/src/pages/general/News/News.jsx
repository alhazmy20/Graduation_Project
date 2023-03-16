import React from 'react'
import {Button, Card, Image, List} from "antd";
import Title from "antd/es/typography/Title";
import instPng from "../../../assets/images/image14.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./News.scss"
import { itemRender } from "../../../components/ui/Pagination"
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;


const News = () => {
  const navigate = useNavigate();

  const data = Array.from({
    length: 25,
  }).map((_, i) => ({
    id: i,
    title: `تعلن سدايا عن موعد بدء التقديم على التدريب التعاوني للترم
       الثاني`,
    avatar: instPng,
    date: "منذ 3 أيام",
    description: '',
  }));

  

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
        pageSize: 7,
      }}
      dataSource={data}
      renderItem={(news) => (
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
                  <Image preview={false} className="avatarMeta" src={news.avatar} />
                }
                title={
                  <Title className="metaTitle">{news.title}</Title>
                }
                description={
                  <Title
                    className="metaDate"
                  >
                    {news.date}
                  </Title>
                }
              />
              <Button
                size="middle"
                type="primary"
                className="newsDetailsBtn"
                shape="round"
                onClick={() => {navigate("/news/"+ news.id,{
                  state: {
                    id: news.id,
                    title: news.title,
                    avatar: news.avatar,
                    description: news.description,
                    date: news.date,
                  }
                });}}
              >
                أظهار التفاصيل
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    ></List>
  )
}

export default News