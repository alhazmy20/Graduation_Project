import React from "react";
import userimg from "../../../assets/images/MaleUser.png";
import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";

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
    label: <Link>تسجيل الخروج</Link>,
  },
];

const UserInfo = () => {
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
                  USER NAME{" "}
                </p>
                <img
                  className="userimg"
                  src={userimg}
                  style={{ width: "50px", objectFit: "cover" }}
                ></img>
              </div>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserInfo;
