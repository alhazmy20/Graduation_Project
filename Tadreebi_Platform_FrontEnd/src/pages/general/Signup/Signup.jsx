import React, { useState } from "react";
import "./Signup.scss";
import { Radio } from "antd";
import FormCard from "../../../components/ui/FormCard/FormCard";
import StudentSignup from "../../../components/form/StudentSignup/StudentSignup";
import InstSignup from "../../../components/form/InstSignup/InstSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [selectedOption, setSelectedOption] = useState("s");

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="signup-page">
      <FormCard className="card">
        <Radio.Group
          value={selectedOption}
          onChange={handleRadioChange}
          size="large"
          buttonStyle="solid"
          className="radio"
        >
          <Radio.Button value="s" className="institutions">
            الطلاب
          </Radio.Button>
          <Radio.Button value="i" className="students">
            جهة التدريب
          </Radio.Button>
        </Radio.Group>
        {selectedOption === "s" && <StudentSignup />}
        {selectedOption === "i" && <InstSignup />}
        <span className="login-span">
          لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>
        </span>
      </FormCard>
    </div>
  );
};

export default Signup;
