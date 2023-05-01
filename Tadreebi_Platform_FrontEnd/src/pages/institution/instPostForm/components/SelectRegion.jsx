import React from "react";
import { Form, Select } from "antd";
import "./SelectRegion.scss";
const SelectRegion = ({ name, options, initValue }) => {
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
      initialValue={initValue || "اختر المنطقة"}
    >
      <Select style={{ flexGrow: "2" }} showSearch>
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
