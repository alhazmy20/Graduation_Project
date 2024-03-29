import React from "react";
import "../components/StartUp.scss";
import backgroundImage from "../../../../assets/images/homebk.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../auth/useContext";

const StartUp = () => {
  const auth = useAuth();

  return (
    <div className="startUpContainer">
      <div className="startUpimg">
        <img src={backgroundImage} alt=""></img>
      </div>

      <div className="startupContnent">
        <div>
          <p>طريقك للبحث عن مهنتك مع تدريبي... </p>
          <Link to={auth.user ? "/training-opportunities" : "/login"}>
            ابدأ هنا
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartUp;
