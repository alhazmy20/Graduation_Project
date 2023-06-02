import React from "react";
import saudiClassificationData from "../../data/saudiClassification.json";
import FormSelect from "./FormSelect";

const MajorsSelect = (props) => {
  const { label, name, ...others } = props;
  const majorOptions = saudiClassificationData.flatMap(({ majors }) =>
    majors.map(({ id, title: label }) => ({
      label,
      value: name === "SCC" ? id : label,
    }))
  );

  return (
    <FormSelect label={label} name={name} options={majorOptions} {...others} />
  );
};

export default MajorsSelect;
