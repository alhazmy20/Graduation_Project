import React from "react";
import { Form, Input } from "antd";

const FormInput = (props) => {
  const {
    inputType,
    placeholder,
    label,
    onChange,
    value,
    disabled,
    rules,
    max,
    ...others
  } = props;

  const formRules = Array.isArray(rules) ? rules : [];

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
      <Form.Item
        rules={[
          { required: true, message: `الرجاء ادخال ${label}` },
          ...formRules,
        ]}
        {...others}
      >
        {inputType === "password" ? (
          <Input.Password placeholder={placeholder} />
        ) : (
          <Input
            placeholder={placeholder}
            type={inputType}
            onChange={onChange}
            defaultValue={value}
            disabled={disabled}
          />
        )}
      </Form.Item>
    </>
  );
};

export default FormInput;
