import React from "react";
import { Form, Select } from "antd";
const SelectRegion = ({ name, options }) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: "الرجاء إختيار المنطقة",
        },
      ]}
      className="formItemStyle"
    >
      <Select style={{ flexGrow: "2" }} defaultValue="اختر المنطقة" showSearch>
        <Select.Option key="*" value="كل المناطق" />
        {options.map((region) => (
          <Select.Option key={region.id} value={region.region}>
            {region.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectRegion;
