import React from "react";
import FormSelect from "./FormSelect";
import { RegionData } from "../../data/TestData";
import { Select } from 'antd';

const CitySelect = (props) => {
  const { selectedRegion, region,label,name, ...others } = props;
  return (
    <FormSelect name={name || "city"} label={label} {...others}>
      {RegionData.find(
        (r) => r.region === (selectedRegion || region)
      )?.cities.map((city) => (
        <Select.Option key={city.id} value={city.city}>
          {city.city}
        </Select.Option>
      ))}
    </FormSelect>
  );
};

export default CitySelect;
