import React from "react";
import { Form, Radio } from "antd";
const ReactRadio = ({ name, options, initValue }) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "الرجاء الاختيار" }]}
      className="formItemStyle"
    >
      <Radio.Group  defaultValue={initValue}>
        {options.map((option) => (
          <Radio
            key={option.value }
            value={option.value}
            
          >
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default ReactRadio;
