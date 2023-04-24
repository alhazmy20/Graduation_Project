import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../InstPostForm.scss";
const ReactTextArea = ({ formdata, handleInputChange, name }) => {
  const [value, setValue] = useState("");
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

  const handleChange = (value) => {
    setValue(value);
    handleInputChange(name, value);
  };

  return (
    <ReactQuill
      placeholder="تفاصيل فرصة التدريب ... "
      value={formdata}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default ReactTextArea;
