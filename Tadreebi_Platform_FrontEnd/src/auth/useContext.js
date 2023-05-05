import { createContext, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { useContext } from "react";

export const AuthContext = createContext(null);

export const AuthContexProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [role, setRole] = useState(null);
  const [redirectAfterLogout, setRedirectAfterLogout] = useState(false);

  const login = async (values) => {
    await fetchCsrfToken();
    const res = await axiosConfig().post("/api/login", values);
    localStorage.setItem("bearer_token", res.data.data.token);
    setRole(res.data.data.user.role);
    setUser(res.data.data.user);
  };

  const fetchCsrfToken = async () => {
    const response = await axiosConfig().get("/api/csrf-token");
    const csrfToken = response.data.data.csrf_token;
    localStorage.setItem("csrf_token", csrfToken);
    return csrfToken;
  };

  const logout = async () => {
    try {
      await axiosConfig().post("/api/logout");
      localStorage.removeItem("user");
      setUser(null);
      setRedirectAfterLogout(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (redirectAfterLogout) {
      window.location.href = "/login";
    }
  }, [redirectAfterLogout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        role,
        fetchCsrfToken,
        setRedirectAfterLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
