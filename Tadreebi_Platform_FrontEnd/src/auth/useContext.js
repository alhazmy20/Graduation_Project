import { createContext, useEffect, useState } from "react";
import api from "../data/axiosConfig";
import { useContext } from "react";

export const AuthContext = createContext(null);

export const AuthContexProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  console.log(user);
  const [role, setRole] = useState(null);
  

  const login = async (values) => {
    await fetchCsrfToken();
    const res = await api().post("/api/login", values);
    localStorage.setItem("bearer_token", res.data.data.token);
    setRole(res.data.data.user.role);
    setUser(res.data.data.user);
  };

  const fetchCsrfToken = async () => {
    const response = await api().get("/api/csrf-token");
    const csrfToken = response.data.data.csrf_token;
    localStorage.setItem("csrf_token", csrfToken);
    return csrfToken;
  };

  const logout = async () => {
    try {
      await api().post("/api/logout");
      setUser(null);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, role, fetchCsrfToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
