import React from "react";
import FormSelect from "./FormSelect";
import { Select } from "antd";
import { RegionData } from "../../data/TestData";

const RegionSelect = (props) => {
  const { onChange, label, name, ...others } = props;
  return (
    <FormSelect name={name || 'region'} label={label} onChange={onChange} {...others}>
      {RegionData.map((region) => (
        <Select.Option key={region.id} value={region.region}>
          {region.name}
        </Select.Option>
      ))}
    </FormSelect>
  );
};

export default RegionSelect;
