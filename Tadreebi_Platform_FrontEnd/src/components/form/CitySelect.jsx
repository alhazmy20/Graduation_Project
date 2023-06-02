import React from "react";
import FormSelect from "./FormSelect";
import RegionWithCities from "../../data/regionWithCities.json";
import { Select } from "antd";

const CitySelect = (props) => {
  const { selectedRegion, region, label, name, exceptAll, ...others } = props;

  const cities =
    RegionWithCities.find((r) => r.region === (selectedRegion || region))
      ?.cities || [];
  const filteredCities = exceptAll
    ? cities.filter((city) => city.city !== "كل المدن")
    : cities;

  return (
    <FormSelect
      name={name || "city"}
      label={label}
      notFoundContent="يرجى اختيار المنطقة أولاً"
      {...others}
    >
      {filteredCities.map((city) => (
        <Select.Option key={city.id} value={city.city}>
          {city.city}
        </Select.Option>
      ))}
    </FormSelect>
  );
};

export default CitySelect;
