import { Button } from 'antd';
import React, { useState } from 'react'

 export const TableText = (text) => {
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
 }

export const AdminInstitutionText = (record) => {
  let buttons = {};
        if (record === "نشط") {
          buttons = <Button className="activeBtn">نشط</Button>;
        } else if (record === "غير نشط")
          buttons = <Button className="inactiveBtn">غير نشط</Button>;
        return buttons;
 }

 export const AdminStudentTable = (text) => {
  let style = {};
  if (text === "نشط") {
    style.color = "#008374b2";
  } else if (text === "غير نشط") {
    style.color = "red";
  }
  return <span style={style}>{text}</span>;
 }