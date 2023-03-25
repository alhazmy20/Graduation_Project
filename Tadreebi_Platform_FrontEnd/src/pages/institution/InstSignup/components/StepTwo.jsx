import React from "react";
import FormInput from "../../../../components/form/FormInput";
import { phoneRules } from "../../../../Validation/rules.js";

const StepTwo = () => {
  return (
    <div>
      <FormInput label="الإسم الأول" labelCol={{ span: 24 }} name="fName" />
      <FormInput label="الإسم الأخير" labelCol={{ span: 24 }} name="lName" />
      <FormInput
        label="المسمى الوظيفي"
        labelCol={{ span: 24 }}
        name="managerPosition"
      />
      <FormInput
        label="البريد الإلكتروني"
        labelCol={{ span: 24 }}
        name="managerEmail"
        rules={[{ message: "الرجاء إدخال بريد الكتروني صالح", type: "email" }]}
      />
      <FormInput
        label="رقم الجوال"
        labelCol={{ span: 24 }}
        name="managerPhone"
        inputType="number"
        placeholder="05XXXXXXXX"
        rules={phoneRules}
      />
    </div>
  );
};

export default StepTwo;
