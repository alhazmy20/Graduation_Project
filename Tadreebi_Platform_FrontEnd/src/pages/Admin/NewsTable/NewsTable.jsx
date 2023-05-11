import React, { Suspense } from "react";
import { useState } from "react";
import { Button, Input } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Edit } from "../../../components/ui/Table/TableHelpers";
import { Await, Link, useLoaderData } from "react-router-dom";
import DeleteModal from "../../../components/ui/DeleteModal/DeleteModal";
import { handlePaginationChange } from "../../../util/helpers";

const NewsTable = () => {
  const newsData = useLoaderData();
  console.log(newsData);

  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const handleNewsSearch = (e) => {
    setIsSearch(true);
    const searchTitle = e.target.value;
    const filteredStudents = newsData.news._data.filter((n) => {
      return n.title.includes(searchTitle);
    });
    setFilteredData(filteredStudents);
  };

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
          <span>
            <Edit
              record={record}
              endPoint_1={"admin"}
              endPoint_2={"manage-news"}
            />
            <DeleteModal
              name={record.title}
              id={record.id}
              endpoint="news"
              deleteType="الخبر"
            />
          </span>
        );
      },
    },
  ];

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

            <div className="filter-container">
              <Input
                className="nameInput"
                placeholder="البحث بعنوان الخبر"
                onChange={handleNewsSearch}
                style={{ margin: "0 10px", maxWidth: "500px" }}
              />
            </div>

            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedData.length} سجل
            </p>
            <Table
              col={columns}
              data={isSearch ? filteredData : loadedData}
              Size={pageSize}
              handleChange={(page, pageSize) =>
                handlePaginationChange(
                  page,
                  pageSize,
                  loadedData,
                  setCurrentRange,
                  setPageSize
                )
              }
              emptyText="لا توجد بيانات"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default NewsTable;
