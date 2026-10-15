import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";


const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://lynk.bonto.run")
).replace(/\/+$/, "");

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/auth/check`, {
        withCredentials: true,
      })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return <div className="min-h-screen bg-[#08130F]" />;
  }

  return authenticated ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
