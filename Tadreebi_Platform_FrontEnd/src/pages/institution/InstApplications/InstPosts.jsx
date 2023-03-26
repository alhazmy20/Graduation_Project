import "./InstPosts.scss";
import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Table from "../../../components/ui/Table/Table";
import InstModal from "./components/InstModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const InstPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const dataSource = [
        {
          key: "1",
          name: "xxxxx",
          city: "xxxxx",
          date: "تدريب تعاوني - تطوير تطبيقات الويب",
          status: "نشط",
          edit: "-",
        },
        {
          key: "2",
          name: "xxxx",
          city: "xxxxx",
          date: "تدريب تعاوني - تطوير تطبيقات الويب",
          status: "نشط",
          edit: "-",
        },
        {
          key: "3",
          name: "xxxx",
          city: "xxxxx",
          date: "تدريب تعاوني - تطوير تطبيقات الويب",
          status: "مغلق",
          edit: "-",
        },
        {
          key: "4",
          name: "xxxx",
          city: "xxxxx",
          date: "تدريب تعاوني - تطوير تطبيقات الويب",
          status: "نشط",
          edit: "-",
        },
        {
          key: "5",
          name: "xxxx",
          city: "xxxxx",
          date: "تدريب تعاوني - تطوير تطبيقات الويب",
          status: "مغلق",
          edit: "=",
        },
        {
          key: "6",
          name: "xxxx",
          city: "xxxxx",
          date: "تدريب تعاوني - تطوير تطبيقات الويب",
          status: "مغلق",
          edit: "-",
        },
      ];

      const columns = [
        {
          title: "عنوان الإعلان",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "المدينة",
          dataIndex: "city",
          align: "center",
        },
        {
          title: "التاريخ",
          dataIndex: "date",
          align: "center",
        },
        {
          title: "الحالة",
          dataIndex: "status",
          align: "center",
          render: (text) => {
            let style = {};
            if (
              text === "نشط"
            ) {
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
                  <Link to ={`/institution/posts/${record.key}`}>{<FontAwesomeIcon className="icon" icon={faPenToSquare} style={{color: "#008374b2"}} />}</Link>
                  <span onClick={() => setIsModalOpen(true)}>{<FontAwesomeIcon icon={faTrash} style={{color: "red"}} />}</span>
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
      const end = Math.min(start + pageSize - 1, dataSource.length);
      setCurrentRange([start, end]);
      setPageSize(pageSize);
    };
    return (  
    <div className="tableContainer">
    <h1 className="Header">البرامج التدريبية</h1>
    <Link to ="/institution/add-post">
    <Button className="newBtn">إضافة برنامج تدريبي جديد</Button>
    </Link>
    <p className="rangeText">
      عرض {currentRange[0]} إلى {currentRange[1]} من أصل {dataSource.length}{" "}
      سجل
    </p>
    <Table col={columns} data={dataSource} Size={pageSize} handleChange={handlePaginationChange}/>
  </div>
); 
}
 
export default InstPosts;