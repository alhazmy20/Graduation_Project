import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../InstPostForm.scss";
const ReactTextArea = (props) => {
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
    <ReactQuill
      placeholder="تفاصيل فرصة التدريب ... "
      value={props.formdata}
      onChange={props.formfun}
      modules={modules}
      formats={formats}
    />
  );
};

export default ReactTextArea;
