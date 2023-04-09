export const phoneRules = [
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value) {
        return Promise.resolve();
      }
      if (value.length !== 10) {
        return Promise.reject(new Error("رقم الهاتف يجب أن يتكون من 10 أرقام"));
      }
      return Promise.resolve();
    },
  }),
];

export const passwordRules = [
  {
    message: "يجب أن لا يقل عن 8 أحرف، حرف كبير و حرف صغير و رقم",
    pattern: "^(?=.*[A-Z])(?=.*\\d).{8,}$",
  },
];

export const confirmPasswordRules = [
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("كلمة السر غير متطابقة"));
    },
  }),
];

export const nationalIdRules = {
  validator: (_, value) => {
    if (!value || value.length !== 10 || isNaN(value)) {
      return Promise.reject(new Error("رقم الهوية يجب أن يتكون من 10 أرقام"));
    }
    return Promise.resolve();
  },
};

export const inputGpaRules = (max) => [
  {
    validator: (_, value) => {
      if (value >= 0 && value <= max) {
        return Promise.resolve();
      }
      return Promise.reject(`الرجاء ادخال معدل بين 0 و ${max}`);
    },
  },
];

export const emailValidationRules = () => {
  const rules = [
    {
      type: "email",
      message: "الرجاء ادخال بريد الكتروني صالح",
    },
  ];
  return rules;
};
