import React from "react";
import { Form } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import generatePicker from "antd/es/date-picker/generatePicker";
import { parse } from "date-fns";
import "./CustomDatePicker.scss";
const CustomDatePicker = ({ name, label, initValue }) => {

  const DatePicker = generatePicker(dateFnsGenerateConfig);

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: "الرجاء تحديد تاريخ",
        },
      ]}
      className="formItemStyle"
    >
      <DatePicker
        placeholder={`اختر ${label}`}
        style={{ width: "100%" }}
        defaultValue={parse(initValue, "yyyy-mm-dd", new Date())}
      />
    </Form.Item>
  );
};

export default CustomDatePicker;
