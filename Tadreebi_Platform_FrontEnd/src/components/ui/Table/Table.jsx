import React from 'react'
import {Table} from "antd";
import { itemRender } from "../../../components/ui/Pagination";
import "./Table.scss"

const TableUI = ({col,data,handleChange,Size, emptyText}) => {
  console.log(data);
  return (
    <Table
        classname="Table"
        dataSource={data}
        columns={col}
        pagination={{
          onChange: handleChange, 
          responsive: true,
          itemRender: itemRender,
          pageSize: Size,
          position: ["bottomLeft"],
        }}
        locale={{ emptyText: emptyText }}
        />
  )
}

export default TableUI;