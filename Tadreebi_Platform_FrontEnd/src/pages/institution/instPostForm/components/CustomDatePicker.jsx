import React from "react";
import { Form, DatePicker } from "antd";
import moment from "moment";

const CustomDatePicker = ({ name, label }) => {
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
      <DatePicker placeholder={`اختر ${label}`} style={{ width: "100%" }} />
    </Form.Item>
  );
};

export default CustomDatePicker;
