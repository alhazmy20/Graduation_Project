import React from "react";
import { Form } from "antd";

const FormInput = (props) => {
  const { label, name, message, pattern, type, ...inputProps } = props;

  const rules = [
    {
      required: true,
      message: message,
      pattern: pattern, // include pattern if it exists
      type: type?.toString(),
    },
    name === "managerPhone" && {
      validator: (_, value) => {
        if (!value || value.length !== 10) {
          return Promise.reject(
            new Error("رقم الهاتف يجب أن يتكون من 10 أرقام")
          );
        }
        return Promise.resolve();
      },
    },
  ];

  return (
    <Form.Item
      {...inputProps}
      label={label}
      labelCol={{ span: 24 }}
      name={name}
      rules={rules}
    >
      {props.children}
    </Form.Item>
  );
};

export default FormInput;
