import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import PostDetailsTable from '../../../components/ui/PostDetailsTable/PostDetailsTable';
import TableUI from '../../../components/ui/Table/Table';
import { GetNewsId } from '../../../data/API'
import "./InstPostDetails.scss"
import { Table } from "react-bootstrap";
import { Button } from 'antd';


const InstPostDetails = () => {
    const {id} = useParams();
    const {data,error ,loading} = GetNewsId(`http://localhost:8000/posts/${id}`);

    const dataSource = [
        {
          key: "1",
          stuName: "فلان فلان الفلاني",
          university: "جامعة طيبة",
          gpa: "5/4.9",
          specialization: "نظم معلومات",
          status: "بإنتظار موافقة الطالب",
          accept: "-",
        },
        {
          key: "2",
          stuName:"فلان فلان الفلاني",
          university: "جامعة الملك فهد للبترول و المعادن",
          gpa: "4/3.5",
          specialization: "هندسة برمجيات",
          status: "مرفوض",
          accept: "-",
        },
        {
          key: "3",
          stuName: "فلان فلان الفلاني",
          university: "جامعة الملك سعود",
          gpa: "5/4.4",
          specialization: "هندسة معمارية",
          status: "بإنتظار موافقة المنشأة",
          accept: "-",
        },
      ];

    const columns = [
        {
            title: "الاسم",
            dataIndex: "stuName",
            align: "center"
        },
        {
            title: "الجامعة",
            dataIndex: "university",
            align: "center"
        },
        {
            title: "المعدل",
            dataIndex: "gpa",
            align: "center"
        },
        {
            title: "التخصص",
            dataIndex: "specialization",
            align: "center"
        },
        {
            title: "الحالة",
            dataIndex: "status",
            align: "center",
            render: (text) => {
                let style = {};
                if (
                  text === "بإنتظار موافقة الطالب" ||
                  text === "بإنتظار موافقة المنشأة"
                ) {
                  style.color = "#F9C068";
                } else if (text === "مرفوض") {
                  style.color = "red";
                } else if (text === "مقبول") {
                  style.color = "#008374b2";
                }
                return <span style={style}>{text}</span>;
              },
        },
        {
            title: "الإجراء",
            dataIndex: "accept",
            align: "center",
            render: (text, row) => {
              let buttons = {};
              let style = {};
              if (row.status === "بإنتظار موافقة المنشأة") {
                buttons = (
                  <span className="btnContainer">
                    {<Button className="acceptBtn">قبول</Button>}
                    {<Button className="rejectBtn">رفض</Button>}
                  </span>
                );
              } else
                buttons = <span>-</span>;
              return buttons;
            },
          },
    ]

    const [statusFilter, setStatusFilter] = useState(null);
    const handleStatusFilterChange = (status) => {
      setStatusFilter(status);
    };
    const filteredDataSource = statusFilter
      ? dataSource.filter((application) => application.status === statusFilter)
      : dataSource;

  return (
    <div className="postDetailsContainer">
        <div className='detailsContainer'>
            <div className='detailsTable'>
                <PostDetailsTable data={data}/>
                </div>
     <div className='contactContainer'>
        <strong className='header'><span>بيانات الاتصال للمنشأة</span></strong>
        <div className='supervisor'>
            <span><strong>مسؤول الاتصال: </strong></span>
            <span>ماهر الحربي</span>
        </div>
        <div className='phone'>
            <span><strong>رقم الجوال: </strong></span>
            <span>+966545930921</span>
        </div>
        <div className='email'>
            <span><strong>البريد الإلكتروني: </strong></span>
            <span>Y-22-02@coop.gov.sa</span>
        </div>
     </div>
    </div>
    <div className="filterTable">
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("")}
        >
          الكل
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("بإنتظار موافقة المنشأة")}
        >
          بإنتظار موافقة المنشأة
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("بإنتظار موافقة الطالب")}
        >
          بإنتظار موافقة الطالب
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("مقبول")}
        >
          مقبول
        </Button>
        <Button
          className="button-filter"
          onClick={() => handleStatusFilterChange("مرفوض")}
        >
          مرفوض
        </Button>
      </div>
    <TableUI col={columns} data={filteredDataSource} filter={statusFilter}/>
    </div>
  )
}

export default InstPostDetails