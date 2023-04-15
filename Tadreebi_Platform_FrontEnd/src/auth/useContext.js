import axios from "axios";
import { createContext, useEffect, useState } from "react";
import api from "../data/axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );



  const login = async (values) => {
     api()
      .get("/api/csrf-token")
      .then(() => {
        api()
          .post("/api/login/", values)
          .then((res) => {
            console.log(res.data);
            setCurrentUser(res.data.data);
            localStorage.setItem("bearer_token", res.data.data.token);
            console.log(currentUser);
          });
      });
  };

  const logout = async (inputs) => {
    await axios.post("/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
