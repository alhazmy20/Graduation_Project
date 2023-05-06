import React from "react";
import { Form, Radio } from "antd";

const ReactRadio = ({ name, options, initValue, ...others }) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "الرجاء الاختيار" }]}
      {...others}
      initialValue={initValue}
    >
      <Radio.Group>
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default ReactRadio;
