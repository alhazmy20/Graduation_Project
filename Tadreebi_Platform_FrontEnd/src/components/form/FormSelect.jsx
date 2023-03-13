import { Form, Select } from "antd";
import React from "react";

const FormSelect = (props) => {
  const { label, children, ...others } = props;
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
      <Form.Item {...others}>
        <Select allowClear showSearch>
          {children}
        </Select>
      </Form.Item>
    </>
  );
};

export default FormSelect;
