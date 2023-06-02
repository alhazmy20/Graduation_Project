import React from "react";
import  UNIVERSITIES  from "../../data/universities.json";
import FormSelect from "./FormSelect";
import { Select } from "antd";

const UniversitySelect = (props) => {
  const { name, label, ...others } = props;
  return (
    <FormSelect label={label} name={name || "university"} {...others}>
      {UNIVERSITIES.map((university) => (
        <Select.Option key={university.id} value={university.name}>
          {university.name}
        </Select.Option>
      ))}
    </FormSelect>
  );
};

export default UniversitySelect;
