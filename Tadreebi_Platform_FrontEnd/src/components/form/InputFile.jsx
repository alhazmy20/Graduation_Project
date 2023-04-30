import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { useState } from "react";

const InputFile = (props) => {
  let { inputType, placeholder, label, fileName,accept, ...others } = props;
  const handleBeforeUpload = (file) => {
    // Clear fileList and only add the current file
    props.onChange([file]);
    return false;
  };
  const [file, setFile] = useState(fileName);
  const fileNameDisplay = file
    ? file.length > 20
      ? file.slice(0, 20) + "..."
      : file
    : fileName
    ? fileName.length > 20
      ? fileName.slice(0, 20) + "..."
      : fileName
    : "ارفاق ملف";

  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
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
      <Form.Item {...others}>
        <Upload
          showUploadList={true}
          beforeUpload={handleBeforeUpload}
          multiple={false}
          fileList={[]}
          accept={accept} 
          onChange={(e) => {
            setFile(e.file.name);
          }}
          
        >
          <Button
            icon={<UploadOutlined />}
            title={fileName}
          >
            {fileNameDisplay}
          </Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default InputFile;
