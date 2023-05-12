import { Suspense, useState } from "react";
import "./InstPosts.scss";
import { Button } from "antd";
import { Await, Link, useLoaderData } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../components/ui/Spinner/Spinner";
import {
  Edit,
  InstPostsText,
  InstTitle,
} from "../../../components/ui/Table/TableHelpers";
import DeleteModal from "../../../components/ui/DeleteModal/DeleteModal";
import { handlePaginationChange } from "../../../util/helpers";

const InstPosts = () => {
  const postsData = useLoaderData();

  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const columns = [
    {
      title: "عنوان الإعلان",
      dataIndex: "title",
      align: "center",
      render: (text, record) => {
        return <InstTitle record={record} text={text} />;
      },
    },
    {
      title: "المدينة",
      dataIndex: "city",
      align: "center",
    },
    {
      title: "وقت النشر",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "postStatus",
      align: "center",
      render: InstPostsText,
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        return (
          <span>
            <Edit
              endPoint_1={"institution"}
              endPoint_2={"newPost"}
              record={record}
            />
            <DeleteModal
              name={record.title}
              id={record.id}
              endpoint="posts"
              deleteType="الإعلان"
            />
          </span>
        );
      },
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={postsData?.posts}
        errorElement={<p>Error loading blog posts.</p>}
      >
        {(loadedPosts) => (
          <div className="tableContainer">
            <h1 className="header">البرامج التدريبية</h1>
            <Link to="/institution/newPost">
              <Button className="addBtn">
                <FontAwesomeIcon icon={faCirclePlus} />
                إضافة برنامج تدريبي جديد
              </Button>
            </Link>
            <p className="rangeText">
            عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedPosts.length} سجل
            </p>
            <Table
              col={columns}
              data={loadedPosts}
              Size={pageSize}
              handleChange={(page, pageSize) =>
                handlePaginationChange(
                  page,
                  pageSize,
                  loadedPosts,
                  setCurrentRange,
                  setPageSize
                )
              }
              emptyText={"لم تتم اضافة اي فرص حتى الآن"}
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default InstPosts;
