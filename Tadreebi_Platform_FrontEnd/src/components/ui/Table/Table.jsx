import React from 'react'
import {Table} from "antd";
import "./Table.scss"
import { paginationText } from '../../../util/helpers';

const TableUI = ({col,data,handleChange,Size, emptyText}) => {
  return (
    <Table
        classname="Table"
        dataSource={data}
        columns={col}
        pagination={{
          onChange: handleChange, 
          responsive: true,
          itemRender: paginationText, 
          pageSize: Size,
          position: ["bottomLeft"],
        }}
        locale={{ emptyText: emptyText }}
        />
  )
}

export default TableUI;