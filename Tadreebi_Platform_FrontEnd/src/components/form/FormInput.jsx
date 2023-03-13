import React from "react";
import { Form, Input } from "antd";

const FormInput = (props) => {
  const { inputType, placeholder, label, ...others } = props;
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
        {inputType === "password" ? (
          <Input.Password placeholder={placeholder} />
        ) : (
          <Input placeholder={placeholder} />
        )}
      </Form.Item>
    </>
  );
};

export default FormInput;
