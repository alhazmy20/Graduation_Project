import React from "react";
import FormSelect from "./FormSelect";
import { Select } from "antd";
import RegionWithCities from "../../data/regionWithCities.json";

const RegionSelect = (props) => {
  const { onChange, label, name, exceptAll, ...others } = props;

  const filteredRegions = exceptAll
    ? RegionWithCities.filter((region) => region.region !== "كل المناطق")
    : RegionWithCities;

  return (
    <FormSelect
      name={name || "region"}
      label={label}
      onChange={onChange}
      {...others}
    >
      {filteredRegions.map((region) => (
        <Select.Option key={region.id} value={region.region}>
          {region.region}
        </Select.Option>
      ))}
    </FormSelect>
  );
};

export default RegionSelect;
