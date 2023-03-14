import React from "react";
import "../components/StartUp.scss";
import backgroundImage from "../../../../assets/images/homebk.png";

const StartUp = () => {
  return (
    <div className="startUpContainer">
      <div className="startUpimg">
        <img src={backgroundImage} alt=""></img>
      </div>

      <div className="startupContnent">
        <div>
          <p>طريقك للبحث عن مهنتك مع تدريبي... </p>
          <button>ابدأ هنا</button>
        </div>
      </div>
    </div>
  );
};

export default StartUp;