import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { useAuth } from "../../../auth/useContext.js";
import "./UserInfo.scss";
const UserInfo = () => {
  const auth = useAuth();

  let role = auth?.user?.role?.toLowerCase();
  if (role === "superadmin") {
    role = "admin";
  }
  const items = [
    auth.user?.role === "Student" && {
      key: "1",
      label: <Link to="student/applications">طلباتي</Link>,
    },
    {
      key: "2",
      label: <Link to={`/${role}/profile`}>الملف الشخصي</Link>,
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
          <div>
            <Space>
              <div className="userinfoContainer">
                <p className="username">{auth?.user?.name}</p>
                <img
                  className="userimg"
                  src={
                    auth.user?.logo ||
                    "https://www9.0zz0.com/2023/06/10/17/839680368.png"
                  }
                  alt=""
                />
              </div>
            </Space>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserInfo;
