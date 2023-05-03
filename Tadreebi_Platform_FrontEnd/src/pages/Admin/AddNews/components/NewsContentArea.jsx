
import { Form } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewsContentArea = ({ initialValue, name }) => {
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
      placeholder="تفاصيل الخبر "
      modules={modules}
      formats={formats}
    />
    </Form.Item>
  );
};

export default NewsContentArea;