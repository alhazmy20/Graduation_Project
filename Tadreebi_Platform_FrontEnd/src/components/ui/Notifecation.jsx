import { message, notification } from "antd";
import React from "react";
import { useRouteError } from "react-router-dom";

const Notifecation = () => {
  const error = useRouteError();
  return notification.error({
    message: "حدث خطأ",
    description: error.message,
  });
};

export default Notifecation;
