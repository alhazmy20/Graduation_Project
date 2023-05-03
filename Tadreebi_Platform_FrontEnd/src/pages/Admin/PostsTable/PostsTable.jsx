import React, { Suspense } from "react";
import { useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Delete, StatusText } from "../../../components/ui/Table/TableFilter";
import PostDeleteModal from "./components/PostDeleteModal";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getPosts } from "../../../util/api";

const PostsTable = () => {
  const postsData = useLoaderData();

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const filterData = (dataSource) => {
    const filteredDataSource = statusFilter
      ? dataSource?.filter((post) => post.postStatus === statusFilter)
      : dataSource;
    return filteredDataSource;
  };

  const columns = [
    {
      title: "عنوان فرصة التدريب",
      dataIndex: "title",
      align: "center",
      render: (text, row) => {
        return (
          <Link className="row-title" to={`${row.id}`}>
            {text}
          </Link>
        );
      },
    },
    {
      title: "اسم المؤسسة",
      dataIndex: "inst",
      align: "center",
      render: (text, row) => {
        return <span>{row.institution.institutionName}</span>;
      },
    },
    {
      title: "تاريخ النشر",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "postStatus",
      align: "center",
      render: (text) => StatusText(text),
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, row) => {
        return (
          <Delete name={row.title} modal={PostDeleteModal} postId={row.id} />
        );
      },
    },
  ];

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handlePaginationChange = (page, pageSize, loadedPosts) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, loadedPosts.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };
  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={postsData?.posts}
        errorElement={<p>Error loading blog posts.</p>}
      >
        {(loadedPosts) => (
          <div className="tableContainer">
            <div className="excelContainer"></div>
            <div className="filterTable">
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("")}
              >
                الكل
              </Button>
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("نشط")}
              >
                الاعلانات النشطة
              </Button>
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("مغلق")}
              >
                الاعلانات الغير نشطة
              </Button>
            </div>
            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedPosts.length} سجل
            </p>
            <Table
              col={columns}
              data={filterData(loadedPosts)}
              Size={pageSize}
              handleChange={(page, pageSize) =>
                handlePaginationChange(page, pageSize, loadedPosts)
              }
              emptyText="لا توجد بيانات"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default PostsTable;

export function AdminPostsLoader() {
  return defer({ posts: getPosts() });
}
