import React, { Suspense } from "react";
import { Button, Card, Image, List } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./News.scss";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import NoData from "../../../components/ui/NoData/NoData";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { paginationText } from '../../../util/helpers';

const News = () => {
  const navigate = useNavigate();
  const newsData = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={newsData?.news}
        errorElement={<p>Error loading blog news.</p>}
      >
        {(loadedNews) => (
          <div className="newsContainer">
            <List
              className="listContainer"
              itemLayout="vertical"
              size="middle"
              locale={{ emptyText: <NoData text="لا توجد أخبار حاليا" /> }}
              pagination={{
                responsive: true,
                position: "bottom",
                itemRender: paginationText,
                align: "center",
                pageSize: 7,
              }}
              dataSource={loadedNews}
              renderItem={(news) => (
                <List.Item className="listItemContainer">
                  <Card size="small" className="newsCard">
                    <div className="cardContainer">
                      <Image
                        preview={false}
                        className="logo"
                        src={news.logo?.logo_url}
                      />

                      <div className="titleContainer">
                        <h2 className="newsTitle">{news.title}</h2>
                        <span className="publicationDate">
                          {news.created_at}
                        </span>
                      </div>
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
                        <span className="buttonText">إظهار التفاصيل</span>
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default News;
