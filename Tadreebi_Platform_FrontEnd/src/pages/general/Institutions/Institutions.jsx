import React, { Suspense } from "react";
import { List } from "antd";
import InfoCard from "./components/InfoCard";
import { itemRender } from "../../../components/ui/Pagination";
import { Await, useLoaderData } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";
const Institutions = () => {
  const institutionsData = useLoaderData();

  return (
    <div style={{ padding: "2rem" }}>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={institutionsData?.institutions}
          errorElement={<p>Error loading data.</p>}
        >
          {(loadedData) => (
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
              dataSource={loadedData}
              renderItem={(item) => (
                <List.Item>
                  <InfoCard item={item} />
                </List.Item>
              )}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default Institutions;
