import React from "react";
import { Form, Radio } from "antd";
const ReactRadio = ({ name, rules, options }) => {
  return (
    <Form.Item name={name} rules={rules} className="formItemStyle">
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
