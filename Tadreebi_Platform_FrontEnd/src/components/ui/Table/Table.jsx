import React from 'react'
import {Table} from "antd";
import { itemRender } from "../../../components/ui/Pagination";
import "./Table.scss"

const TableUI = ({col,data,handleChange,Size}) => {
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
      />
  )
}

export default TableUI;