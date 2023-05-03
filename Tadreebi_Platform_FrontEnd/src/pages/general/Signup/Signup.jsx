import React, { useState } from "react";
import "./Signup.scss";
import { Radio } from "antd";
import FormCard from "../../../components/ui/FormCard/FormCard";
import { Link } from "react-router-dom";
import StudentSignup from '../../student/StudentSignup/StudentSignup';
import InstSignup from '../../institution/InstSignup/InstSignup';
import SupervisorSignup from '../../supervisor/SupervisorSignup/SupervisorSignup';

const Signup = () => {
  const [selectedOption, setSelectedOption] = useState("stu");

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
          <Radio.Button value="stu" className="institutions">
            الطلاب
          </Radio.Button>
          <Radio.Button value="inst" className="students">
            جهة التدريب
          </Radio.Button>
          <Radio.Button value="sop" className="supervisor">
             مشرف التدريب
          </Radio.Button>
        </Radio.Group>
        {selectedOption === "stu" && <StudentSignup />}
        {selectedOption === "inst" && <InstSignup />}
        {selectedOption === "sop" && <SupervisorSignup />}
        <span className="login-span">
          لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>
        </span>
      </FormCard>
    </div>
  );
};

export default Signup;
