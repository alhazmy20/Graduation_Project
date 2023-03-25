import React from 'react'
import { useParams } from 'react-router-dom';
import PostDetailsTable from '../../../components/ui/PostDetailsTable/PostDetailsTable';
import TableUI from '../../../components/ui/Table/Table';
import { GetNewsId } from '../../../data/API'
import "./InstPostDetails.scss"
import { Table } from "react-bootstrap";


const InstPostDetails = () => {
    const {id} = useParams();
    const {data,error ,loading} = GetNewsId(`http://localhost:8000/posts/${id}`);

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
    <TableUI/>
    </div>
  )
}

export default InstPostDetails