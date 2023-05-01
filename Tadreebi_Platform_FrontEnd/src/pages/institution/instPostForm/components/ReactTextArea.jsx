import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Form } from "antd";

import "react-quill/dist/quill.snow.css";
import "../InstPostForm.scss";
const ReactTextArea = ({ name, initialValue }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ direction: "rtl" }],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "bullet",
    "script",
    "direction",
    "blockquote",
    "link",
    "image",
    "video",
    "formula",
  ];

  // console.log(formdata);
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: "الرجاء ادخل وصف التدريب",
        },
      ]}
      initialValue={initialValue}
    >
      <ReactQuill
        name={name}
        placeholder="تفاصيل فرصة التدريب ... "
        modules={modules}
        formats={formats}
      />
    </Form.Item>
  );
};

export default ReactTextArea;
