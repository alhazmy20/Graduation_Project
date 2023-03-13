import React from "react";
import FormInput from "../../../../components/form/FormInput";

const StepTwo = () => {
  return (
    <div>
      <FormInput
        label="الإسم الأول"
        labelCol={{ span: 24 }}
        name="fName"
        rules={[
          {
            required: true,
            message: "الرجاء إدخال الإسم الأول ",
          },
        ]}
      />
      <FormInput
        label="الإسم الأخير"
        labelCol={{ span: 24 }}
        name="lName"
        rules={[
          {
            required: true,
            message: "الرجاء إدخال الإسم الأخير ",
          },
        ]}
      />
      <FormInput
        label="المسمى الوظيفي"
        labelCol={{ span: 24 }}
        name="managerPosition"
        rules={[
          {
            required: true,
            message: "الرجاء إدخال المسمى الوظيفي",
          },
        ]}
      />
      <FormInput
        label="البريد الإلكتروني"
        labelCol={{ span: 24 }}
        name="managerEmail"
        rules={[
          { required: true, message: "الرجاء ادخال البريد الإلكتروني" },
          { message: "الرجاء إدخال بريد الكتروني صالح", type: "email" },
        ]}
      />
      <FormInput
        label="رقم الجوال"
        labelCol={{ span: 24 }}
        name="managerPhone"
        type="number"
        placeholder="05XXXXXXXX"
        rules={[
          { required: true, message: "الرجاء ادخال البريد الإلكتروني" },
          { message: "الرجاء إدخال بريد الكتروني صالح", type: "email" },
        ]}
      />
    </div>
  );
};

export default StepTwo;
