import React from "react";
import duontone from "../../../../assets/duotone.png";
import "./About.scss";
const About = () => {
  return (
    <div className="AboutMain">
      <div className="title">نبذة عنا</div>

      <div className="aboutContainer">
        <div className="aboutContent">
          <div className="platfrompar">
            <h5>منصة تدريبي:</h5>
            <p>
              منصة سعودية تقدم المساعدة لمنظمات الأعمال و الطلاب في جميع
              الجامعات السعودية من أجل تحقيق متطلبات سوق العمل.
            </p>
          </div>
          <div className="platfromvio">
            <h5>رؤيتنا:</h5>
            <p>
              تحقيق الازدهار في السوق الأعمال بشكل مبتكر وإحداث تغيير في مجال
              الأعمال نحو الأفضل.
            </p>
          </div>
        </div>

        <div className="imgDuontone">
          <img alt="" src={duontone}></img>
        </div>
      </div>
    </div>
  );
};

export default About;
