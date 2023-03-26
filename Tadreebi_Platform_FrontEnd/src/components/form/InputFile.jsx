import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { useState } from "react";

const InputFile = (props) => {
  let { inputType, placeholder, label, fileName, ...others } = props;
  const handleBeforeUpload = (file) => {
    // Clear fileList and only add the current file
    props.onChange([file]);
    return false;
  };
  const [file, setFile] = useState(fileName);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          color: "#808080",
          display: "block",
          marginBottom: "5px",
          fontWeight: "500",
        }}
      >
        {label}
      </label>
      <Form.Item
        {...others}
        rules={!fileName && [{ required: true, message: `الرجاء ارفاق ${label}` }]}
      >
        <Upload
          showUploadList={true}
          beforeUpload={handleBeforeUpload}
          multiple={false}
          fileList={ []}
          accept=".pdf"
          onChange={(e) => {
            setFile(e.file.name);
          }}
        >
          <Button icon={<UploadOutlined />} style={{ minWidth: "200px", maxWidth:'fitContent' }}>
            {file ? file : fileName ? fileName : 'ارفاق ملف'}
          </Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default InputFile;
