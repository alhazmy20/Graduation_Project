import React from "react";
import FormInput from "./FormInput";
import { emailValidationRules } from "../../validation/rules";

const EmailInput = (props) => {
  const { label, name, ...others } = props;
  return (
    <FormInput
      label={label}
      name={name || "email"}
      rules={emailValidationRules}
      {...others}
    />
  );
};

export default EmailInput;
