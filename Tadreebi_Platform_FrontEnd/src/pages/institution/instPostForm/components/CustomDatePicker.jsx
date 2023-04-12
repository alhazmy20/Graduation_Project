import React from "react";
import { Form, DatePicker } from "antd";

const CustomDatePicker = ({ name, label, required, handleInputChange }) => {
  const handleDateChange = (date, dateString) => {
    handleInputChange(name, dateString);
  };

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: "Please select a date!",
        },
      ]}
      className="formItemStyle"
    >
      <DatePicker
        placeholder={`اختر ${label}`}
        style={{ width: "100%" }}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
      />
    </Form.Item>
  );
};

export default CustomDatePicker;
