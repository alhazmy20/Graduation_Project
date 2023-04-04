import { Spin } from 'antd';
import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="spin-container">
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
