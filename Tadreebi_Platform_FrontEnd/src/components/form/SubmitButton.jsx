import { Button } from "antd";
import React from "react";

const SubmitButton = (props) => {
  const { children, className, ...others } = props;
  return (
    <Button
      type="primary"
      htmlType="submit"
      className={`form-btn ${className}`}
      {...others}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
