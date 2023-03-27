import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../InstPostForm.scss";
const ReactTextArea = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["blockquote", "code-block"],
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
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "blockquote",
    "code-block",
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
