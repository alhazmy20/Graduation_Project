import React from "react";
import { Input, Form } from "antd";

const ReactInput = ({ name, initialValue }) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "الرجاء ادخال العنوان" }]}
      initialValue={initialValue}
    >
      <Input value={initialValue} placeholder="عنوان فرصة التدريب ..." />
    </Form.Item>
  );
};

export default ReactInput;
