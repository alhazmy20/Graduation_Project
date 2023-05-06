import React from "react";
import { Form } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import generatePicker from "antd/es/date-picker/generatePicker";
import { parse } from "date-fns";
import arSA from "antd/lib/locale/ar_EG";
const DatePicker = generatePicker(dateFnsGenerateConfig);

const CustomDatePicker = ({ name, label, initValue, ...others }) => {
  const dateFormat = "yyyy-MM-dd";
  const lockedValue = initValue
    ? parse(initValue, dateFormat, new Date())
    : undefined;

  // Adjust date by timezone offset
  const offset = new Date().getTimezoneOffset();
  lockedValue?.setMinutes(lockedValue.getMinutes() - offset);

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: "الرجاء تحديد تاريخ",
        },
      ]}
      initialValue={lockedValue}
      {...others}
    >
      <DatePicker
        placeholder={`اختر ${label}`}
        style={{ width: "100%" }}
        locale={arSA}
      />
    </Form.Item>
  );
};

export default CustomDatePicker;
