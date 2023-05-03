import { Form, Select } from "antd";
import React from "react";

const FormSelect = (props) => {
  const { label, children,options,onChange,disabled, ...others } = props;
  return (
    <>
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
      <Form.Item rules={[{ required: true, message: `الرجاء اختيار ${label}` }]} {...others}>
        <Select showSearch options={options} onChange={onChange} disabled={disabled}>
          {children}
        </Select>
      </Form.Item>
    </>
  );
};

export default FormSelect;
