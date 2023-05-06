import React from "react";
import ReactQuill from "react-quill";
import { Form } from "antd";
import "react-quill/dist/quill.snow.css";
const ReactTextArea = ({ name, initialValue, lable, ...others }) => {
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
          message: `الرجاء ${lable}`,
        },
      ]}
      initialValue={initialValue}
      {...others}
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
