import React from "react";
import FormInput from "./FormInput";
import { confirmPasswordRules } from "../../Validation/rules";

const PasswordConfirInput = ({ label, name }) => {
  return (
    <FormInput
      label={label}
      inputType="password"
      name={name || "password_confirmation"}
      rules={confirmPasswordRules}
    />
  );
};

export default PasswordConfirInput;
