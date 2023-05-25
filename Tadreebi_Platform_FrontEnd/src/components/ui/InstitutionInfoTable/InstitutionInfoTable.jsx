import React from "react";
import "./InstitutionInfoTable.scss";
import { useAuth } from "../../../auth/useContext";
import { Table } from "react-bootstrap";

const InstitutionInfoTable = ({ data }) => {
  const auth = useAuth();
  const role = auth.user?.role;
  const allowedRoles = ["Admin", "Supervisor", "SuperAdmin"];
  const showContactInfo = allowedRoles.includes(role);

  const renderDetails = (label, value) => (
    <td>
      <div className="details">
        <span className="label">{label}:</span>
        <span>{value}</span>
      </div>
    </td>
  );

  return (
    <Table className="InstitutionInfoTable" responsive>
      <tbody>
        <tr>
          {renderDetails("المنطقة", data.region)}
          {renderDetails("المدينة", data.city)}
        </tr>
        <tr>
          {renderDetails("القطاع", data.institutionSector)}
          {renderDetails("المجال", data.institutionField)}
        </tr>
        {showContactInfo && (
          <>
            <tr>
              {renderDetails("البريد الإلكتروني", data.email)}
              {renderDetails("مسؤول الإتصال", `${data.fName} ${data.lName}`)}
            </tr>
            <tr>
              {renderDetails("رقم الجوال", data.managerPhone)}
              {renderDetails(
                "البريد الإلكتروني لمسؤول الإتصال",
                data.managerEmail
              )}
            </tr>
          </>
        )}
      </tbody>
    </Table>
  );
};

export default InstitutionInfoTable;
