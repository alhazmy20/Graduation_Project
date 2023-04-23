import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { useAuth } from "../../../auth/useContext.js";

const UserInfo = () => {
  const auth = useAuth();
  const MenuPath =
    auth.user?.role === "Institution"
      ? "/institution/profile"
      : "/student/profile";
  const items = [
    {
      key: "1",
      label: <Link to="/Login">طلباتي</Link>,
    },
    {
      key: "2",
      label: <Link to={MenuPath}>الملف الشخصي</Link>,
    },
    {
      key: "3",
      label: <Link onClick={() => auth.logout()}>تسجيل الخروج</Link>,
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
                  {auth.user.name}
                </p>
                <img
                  className="userimg"
                  src={
                    "http://s3.eu-central-1.amazonaws.com/graduation-project-test1/students/personal_pictures/0cPAv3DmiR6OJoWWBWod0ef3V5PssfWVAness7k6.png"
                  }
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    background: "#e2e5e9",
                    padding: "2px",
                  }}
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
