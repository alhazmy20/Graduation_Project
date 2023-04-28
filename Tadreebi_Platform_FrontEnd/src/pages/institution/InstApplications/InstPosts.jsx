import "./InstPosts.scss";
import { Suspense, useState } from "react";
import { Button, notification } from "antd";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import InstModal from "./components/InstModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../../../data/API";
import Spinner from "../../../components/ui/Spinner/Spinner";
import {
  Delete,
  Edit,
  InstPostsText,
  InstTitle,
} from "../../../components/ui/Table/TableFilter";
import { getPosts } from "../../../util/api";

const InstPosts = () => {
  const postsData = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const columns = [
    {
      title: "عنوان الإعلان",
      dataIndex: "title",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <InstTitle record={record} text={text} />
          </>
        );
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
          <>
            <Edit
              endPoint_1={"institution"}
              endPoint_2={"newPost"}
              record={record}
            />
            <Delete attr={record.title} modal={InstModal} />
          </>
        );
      },
    },
  ];

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, postsData.length);
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
            <h1 className="Header">البرامج التدريبية</h1>
            <Link to="/institution/newPost">
              <Button className="add-btn">
                إضافة برنامج تدريبي جديد
                <FontAwesomeIcon icon={faCirclePlus} />
              </Button>
            </Link>
            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل {postsData.length}{" "}
              سجل
            </p>
            <Table
              col={columns}
              data={loadedPosts}
              Size={10}
              handleChange={handlePaginationChange}
              emptyText={'لم تتم اضافة اي فرص حتى الآن'}
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default InstPosts;

export function instPostsLoader() {
  return defer({ posts: getPosts() });
}
