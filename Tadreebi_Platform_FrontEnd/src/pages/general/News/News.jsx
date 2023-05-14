import React, { Suspense } from "react";
import { Button, Card, Image, List } from "antd";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./News.scss";
import { itemRender } from "../../../components/ui/Pagination";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import NoData from "../../../components/ui/NoData/NoData";
import { getAllNews } from "../../../util/api";
import Spinner from '../../../components/ui/Spinner/Spinner';

const { Meta } = Card;

const News = () => {
  const navigate = useNavigate();
  const newsData = useLoaderData();
  console.log(newsData);

  return (
    <Suspense fallback={<Spinner />}>
    <Await
      resolve={newsData?.news}
      errorElement={<p>Error loading blog news.</p>}
    >
      {(loadedNews) => (
    <List
      className="listContainer"
      itemLayout="vertical"
      size="middle"
      locale={{ emptyText: <NoData text="لا توجد أخبار حاليا" /> }}
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
      dataSource={loadedNews}
      renderItem={(news) => (
        <List.Item className="listItemContainer">
          <Card size="small" className="newsCard">
            <div className="metaContainer">
              <Meta
                className="metaDetails"
                avatar={
                  <Image
                    preview={false}
                    className="avatarMeta"
                    src={news.avatar}
                  />
                }
                title={<Title className="metaTitle">{news.title}</Title>}
                description={<Title className="metaDate">{news.date}</Title>}
              />
              <Button
                size="middle"
                type="primary"
                className="newsDetailsBtn"
                shape="round"
                key={news.id}
                onClick={() => {
                  navigate(`/news/${news.id}`);
                }}
              >
                أظهار التفاصيل
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>
            <span className='publicationDate'>{news.created_at}</span>
          </Card>
        </List.Item>
      )}
    />)}
    </Await>
  </Suspense>
  );
};

export default News;

export const loader = () => {
  return defer({ news: getAllNews() });
};
