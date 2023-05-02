import React, { Suspense } from "react";
import { useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Delete, Edit } from "../../../components/ui/Table/TableFilter";
import NewsModal from "./components/NewsModal";
import { Await, Link, useLoaderData } from "react-router-dom";

const NewsTable = () => {
  const newsData = useLoaderData();

  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  // const filterData = (dataSource) => {
  //   const filteredDataSource = statusFilter
  //     ? dataSource?.filter((news) => news.status === statusFilter)
  //     : dataSource;

  //   return filteredDataSource;
  // };
  const columns = [
    {
      title: "عنوان الخبر",
      dataIndex: "title",
      align: "center",
    },

    {
      title: "تاريخ النشر",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "الإجراء",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Edit record={record} endPoint_1={"admin"}
              endPoint_2={"manage-news"} />
            <Delete name={record.title} modal={NewsModal} newsId={record.id} />
          </>
        );
      },
    },
  ];

  const handlePaginationChange = (page, pageSize, loadedData) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, loadedData.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };
  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={newsData?.news}
        errorElement={<p>Error loading institutions data.</p>}
      >
        {(loadedData) => (
          <div className="tableContainer">
            <div className="excelContainer">
              <Button className="excelBtn">
                <Link to="/admin/add-news">
                <FontAwesomeIcon className="icon" icon={faPlusCircle} />{" "}
                <strong>اضافة خبر</strong>
                </Link>
              </Button>
            </div>

            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل {" "}
              {loadedData.length} سجل
            </p>
            <Table
              col={columns}
              data={loadedData}
              Size={pageSize}
              handleChange={(page, pageSize) => handlePaginationChange(page, pageSize, loadedData)}
              emptyText="لا توجد بيانات"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default NewsTable;
