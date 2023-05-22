import React from "react";
import ReactQuill from "react-quill";
import { Form } from "antd";
import "react-quill/dist/quill.snow.css";
const ReactTextArea = ({ name, initialValue, lable, ...others }) => {
  const modules = {
    toolbar: [
      [{ header: [3, false] }],
      [{ align: [] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ direction: "rtl" }],
    ],
  };

  const formats = [
    "header",
    "align",
    "bold",
    "italic",
    "underline",
    "color",
    "background",
    "direction",
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
