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
    <PostDetailsTable className="PostDetailsTable" data={data}/>
     <Table responsive className='post-detail-table'>
        <thead>
            <tr style={{textAlign: 'center'}}>
                <td>
                    <strong>بيانات الاتصال للمنشأة</strong>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <span><strong>مسؤول الإتصال: </strong>ماهر الحربي</span>
            </tr>
            <tr>
                <span><strong>رقم الجوال: </strong>+966545930921</span>
            </tr>
            <tr>
                <span><strong>البريد الإلكتروني: </strong>Y-22-02@coop.gov.sa</span>
            </tr>
        </tbody>
     </Table>
    </div>
    <TableUI/>
    </div>
  )
}

export default InstPostDetails