import React from "react";
import "./InstitutionInfoCard.scss";
import { useAuth } from "../../../auth/useContext";

const InstitutionInfoCard = ({ data }) => {
  const auth = useAuth();
  const role = auth.user?.role;
  const allowedRoles = ["Admin", "Supervisor", "SuperAdmin"];
  const showContactInfo = allowedRoles.includes(role);

  const renderDetails = (label, value) => (
    <div className="details">
      <span className="label">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="InstitutionInfoCard">
      <span className="title">بيانات اساسية</span>
      {renderDetails("المدينة", data.city)}
      {renderDetails("القطاع", data.institutionSector)}
      {renderDetails("المجال", data.institutionField)}

      {showContactInfo && (
        <>
          {renderDetails("البريد الإلكتروني", data.email)}
          <span className="title">بيانات الإتصال</span>
          {renderDetails("مسؤول الإتصال", `${data.fName} ${data.lName}`)}
          {renderDetails("رقم الجوال", data.managerPhone)}
          {renderDetails("البريد الإلكتروني", data.managerEmail)}
        </>
      )}
    </div>
  );
};

export default InstitutionInfoCard;
