import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthContexProvider } from "./auth/useContext";
// import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContexProvider>
      <App />
    </AuthContexProvider>
);
