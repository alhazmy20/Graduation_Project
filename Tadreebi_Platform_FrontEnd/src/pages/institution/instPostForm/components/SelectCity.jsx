import React from "react";
import { Form, Select } from "antd";
import "./SelectCity.scss";
const SelectCity = ({ data, formDate, initValue }) => {
  return (
    <Form.Item
      rules={[
        {
          required: true,
          message: "الرجاء إختيار المدينة",
        },
      ]}
      name="city"
      className="formItemStyle"
      initialValue={initValue || "اختر المدينة"}
    >
      <Select style={{ flexGrow: "2" }} showSearch>
        <Select.Option key="*" value="كل المدن" />
        {data
          .filter((r) => r.region === formDate.region)
          .map((region) =>
            region.cities.map((city) => (
              <Select.Option key={city.id} value={city.city}>
                {city.city}
              </Select.Option>
            ))
          )}
      </Select>
    </Form.Item>
  );
};

export default SelectCity;
