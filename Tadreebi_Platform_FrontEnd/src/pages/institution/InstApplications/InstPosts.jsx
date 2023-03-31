import "./InstPosts.scss";
import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import InstModal from "./components/InstModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { GetAllNews } from "../../../data/API";
const InstPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading } = GetAllNews("http://localhost:8000/posts");
  

  const columns = [
    {
      title: "عنوان الإعلان",
      dataIndex: "title",
      align: "center",
      render: (text,record) => {
        return <span><Link to={`/institution/posts/${record.id}`}>
        {text}
        </Link></span>
      }
    },
    {
      title: "المدينة",
      dataIndex: "city",
      align: "center",
    },
    {
      title: "التاريخ",
      dataIndex: "publishDate",
      align: "center",
    },
    {
      title: "الحالة",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        let style = {};
        if (text === "نشط") {
          style.color = "#008374b2";
        } else if (text === "مغلق") {
          style.color = "red";
        }
        return <span style={style}>{text}</span>;
      },
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        let buttons = {};
        buttons = (
          <span>
            <Link to={`/institution/newPost/${record.key}`}>
              {
                <FontAwesomeIcon
                  className="icon"
                  icon={faPenToSquare}
                  style={{ color: "#008374b2" }}
                />
              }
            </Link>
            <span onClick={() => setIsModalOpen(true)}>
              {
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "red", cursor: "pointer" }}
                />
              }
            </span>
            <InstModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen} />
          </span>
        );
        return buttons;
      },
    },
  ];

  const [pageSize, setPageSize] = useState(3);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const handlePaginationChange = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, data.length);
    setCurrentRange([start, end]);
    setPageSize(pageSize);
  };
  return (
    <div className="tableContainer">
      <h1 className="Header">البرامج التدريبية</h1>
      <Link to="/institution/newPost">
        <Button className="newBtn">إضافة برنامج تدريبي جديد</Button>
      </Link>
      <p className="rangeText">
        عرض {currentRange[0]} إلى {currentRange[1]} من أصل {data.length}{" "}
        سجل
      </p>
      <Table
        col={columns}
        data={data}
        Size={pageSize}
        handleChange={handlePaginationChange}
      />
    </div>
  );
};

export default InstPosts;
