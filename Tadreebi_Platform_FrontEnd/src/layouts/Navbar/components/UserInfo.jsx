import React, { useContext } from "react";
import userimg from "../../../assets/images/MaleUser.png";
import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { AuthContext, useAuth } from "../../../auth/useContext.js";

const UserInfo = () => {
  const auth = useAuth();

  const items = [
    {
      key: "1",
      label: <Link to="/Login">طلباتي</Link>,
    },
    {
      key: "2",
      label: <Link to="">الملف الشخصي</Link>,
    },
    {
      key: "3",
      label: <Link onClick={()=>auth.logout()}>تسجيل الخروج</Link>,
    },
  ];
  return (
    <div className="register">
      <div> 
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <div
                className="userinfoContainer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <p className="username" style={{ color: "white" }}>
                  {/*auth.user.institution.institutionName*/}
                </p>
                <img
                  className="userimg"
                  src={"https://www11.0zz0.com/2023/04/16/20/498484281.png"}
                  style={{ width: "40px", height:'40px', objectFit: "cover", borderRadius:'50%', background:"#fff", padding:"2px" }}
                  alt=""
                />
              </div>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserInfo;
