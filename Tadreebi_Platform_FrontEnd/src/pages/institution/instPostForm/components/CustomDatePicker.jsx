import React from "react";
import { Form } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import generatePicker from "antd/es/date-picker/generatePicker";
import { parse } from "date-fns";

const DatePicker = generatePicker(dateFnsGenerateConfig);

const CustomDatePicker = ({ name, label, initValue }) => {
  const dateFormat = "yyyy-mm-dd";

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
      initialValue={
        initValue ? parse(initValue, dateFormat, new Date()) : undefined
      }
    >
      <DatePicker
        placeholder={`اختر ${label}`}
        style={{ width: "100%" }}
        format={initValue ? dateFormat : undefined}
      />
    </Form.Item>
  );
};

export default CustomDatePicker;
