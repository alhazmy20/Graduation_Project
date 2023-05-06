import React from "react";
import { phoneRules } from "../../validation/rules";
import FormInput from "./FormInput";

const PhoneInput = (props) => {
  const { label, name, ...others } = props;
  return (
    <FormInput
      label={label}
      name={name || "phone"}
      inputType="number"
      rules={phoneRules}
      {...others}
    />
  );
};

export default PhoneInput;
