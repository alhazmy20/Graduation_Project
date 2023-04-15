import "./InstPosts.scss";
import { useState } from "react";
import { Button, notification } from "antd";
import { Link } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import InstModal from "./components/InstModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {  useFetch } from "../../../data/API";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Delete, Edit, InstPostsText, InstTitle } from "../../../components/ui/Table/TableFilter";

const InstPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading, error } = useFetch("http://localhost:8000/posts");

  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    notification.error(error);
    return null;
  }

  const {
    data: { data: posts },
  } = data;

  const columns = [
    {
      title: "عنوان الإعلان",
      dataIndex: "title",
      align: "center",
      render: (text, record) => {
        return <><InstTitle record={record} text={text}/></>
      },
    },
    {
      title: "المدينة",
      dataIndex: "city",
      align: "center",
    },
    {
      title: "التاريخ",
      dataIndex: "t_startDate",
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
        return <><Edit endPoint_1={"institution"} endPoint_2={"newPost"} record={record}/><Delete attr={record.title} modal={InstModal}/></>
      },
    },
  ];

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, posts.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };

  return (
    <div className="tableContainer">
      <h1 className="Header">البرامج التدريبية</h1>
      <Link to="/institution/newPost">
        <Button className="add-btn">
           إضافة برنامج تدريبي جديد    
        <FontAwesomeIcon icon={faCirclePlus}/>
        
        </Button>
      </Link>
      <p className="rangeText">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {posts.length} سجل
      </p>
      <Table
        col={columns}
        data={posts}
        Size={pageSize}
        handleChange={handlePaginationChange}
      />
    </div>
  );
};

export default InstPosts;
