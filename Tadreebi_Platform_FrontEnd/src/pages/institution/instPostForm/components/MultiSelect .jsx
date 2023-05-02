import { useState } from "react";
import { Form, Select } from "antd";
import "./MultiSelect.scss";
const MultiSelect = ({ name, label, options, initValue }) => {
  



  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: `الرجاء اختيار ${label}`,
        },
      ]}
      className="formItemStyle"
      initialValue={initValue}
    >
      <Select
        mode="multiple"
        allowClear
        placeholder={`اختر ${label}`}
        style={{ flexGrow: "2" }}
      >
        {options.map((m) => (
          <Select.Option key={m.SSC} value={JSON.stringify(m)}>
            {m.major}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default MultiSelect;
// how to make the select value submit  like [{ SCC: id ,major: name  }]
// onst options = data
//   .map((m) =>
//     m.majors.map((majorName) => ({
//       label: majorName.title,
//       value: majorName.id,
//     }))
//   )
//   .flat();
