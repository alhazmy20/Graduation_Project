import React from "react";
import { Form, Input } from "antd";

const FormInput = (props) => {
  const { inputType, placeholder, label, onChange,value, ...others } = props;
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
          <Input placeholder={placeholder} type={inputType} onChange={onChange} defaultValue={value} />
        )}
        
      </Form.Item>
    </>
  );
};

export default FormInput;
