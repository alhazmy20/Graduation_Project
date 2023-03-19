import React from "react";
import "./SmallTable.scss";
import { Table } from "react-bootstrap";
const SmallTable = () => {
    return (
      <Table responsive className="ss">
        <tbody>
          <tr>
            <td>
              <span className="label">الكل</span>
            </td>
            <td>
              <span className="label">بإنتظار موافقة المنشأة</span>
            </td>
            <td>
              <span className="label">بإنتظار موافقة الطالب</span>
            </td>
            <td>
              <span className="label">مقبول</span>
            </td>
            <td>
              <span className="label">مرفوض</span>
            </td>
            <td>
              <span className="label">تم إلغاء الطلب</span>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };
 
export default SmallTable;