import React from "react";
import FormInput from "./FormInput";
import { passwordRules } from "../../Validation/rules";

const PasswordInput = ({ label, name }) => {
  return (
    <FormInput
      label={label}
      inputType="password"
      name={name || "password"}
      rules={passwordRules}
    />
  );
};

export default PasswordInput;
