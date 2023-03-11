import React from "react";
import { Input } from "antd";
import FormInput from "../../../../components/form/FormInput";

const StepTwo = (props) => {
  const INPUTS_DATA = [
    {
      id: 1,
      label: "الإسم الأول",
      name: "fName",
      message: "الرجاء إدخال الإسم الأول ",
    },
    {
      id: 2,
      label: "الإسم الأخير",
      name: "lName",
      message: "الرجاء إدخال الإسم الأخير ",
    },
    {
      id: 3,
      label: "المسمى الوظيفي",
      name: "managerPosition",
      message: "الرجاء إدخال المسمى الوظيفي",
    },
    {
      id: 4,
      label: "البريد الإلكتروني",
      name: "managerEmail",
      message: "الرجاء إدخال بريد الكتروني صالح",
      pattern:
        "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;",
      type: "email",
    },
    {
      id: 5,
      label: "رقم الجوال",
      name: "managerPhone",
      message: null,
      type: "number",
      placeholder: "05XXXXXXXX",
    },
  ];

  return (
    <div>
      {INPUTS_DATA.map((field) => (
        <FormInput
          key={field.id}
          label={field.label}
          name={field.name}
          message={field.message}
        >
          <Input type={field.type} placeholder={field.placeholder} />
        </FormInput>
      ))}
    </div>
  );
};

export default StepTwo;
