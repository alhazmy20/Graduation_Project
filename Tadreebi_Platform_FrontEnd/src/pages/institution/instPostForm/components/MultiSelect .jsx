import { useState } from "react";
import { Form, Select } from "antd";
import "./MultiSelect.scss";
const MultiSelect = ({ name, label, options, handleInputChange }) => {
  const [value, setValue] = useState([]);

  const handleChange = (value) => {
    setValue(value);
    handleInputChange(name, value);
  };

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: `الرجاء اختيار ${label}`,
        },
      ]}
      className="formItemStyle"
    >
      <Select
        mode="multiple"
        allowClear
        placeholder={`اختر ${label}`}
        value={value}
        onChange={handleChange}
        options={options}
        style={{ flexGrow: "2" }}
      />
    </Form.Item>
  );
};

export default MultiSelect;
