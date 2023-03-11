import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";
import page_not_found from '../../../assets/svg/page_not_found.svg'

const NotFound = () => {
  return (
    <div className='notFound'>
      <img src={page_not_found} width={300} alt="" />
      <h2>عذراً، لكن الصفحة التي تبحث عنها غير موجودة.</h2>
      <span></span>
      <h4>
        يمكنك العودة إلى <Link to="/">الصفحة الرئيسية</Link>
      </h4>
    </div>
  );
};

export default NotFound;
