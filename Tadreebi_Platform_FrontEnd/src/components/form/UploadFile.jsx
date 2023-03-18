import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";

const pro = {
  name: "file",
  accept: ".pdf",
  action: "",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} تم الرفع بنجاح`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} هناك خطأ ما.`);
    }
  },
};
const UploadFile = (props) => {
  const { label, name, ...others } = props;
  return (
    <div className={`${props.className} upload-file`} style={{ width: "100%" }}>
      <span
        style={{
          color: "#808080",
          display: "block",
          fontWeight: "500",
        }}
      >
        {label}
      </span>
      <FormItem name={name}>
        <Upload>
          <Button icon={<UploadOutlined />}>رفع ملف pdf</Button>
        </Upload>
      </FormItem>
    </div>
  );
};

export default UploadFile;
