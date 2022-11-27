import { Navigate } from "react-router-dom";

const RutasPublicas = ({ children }) => {
  if (localStorage.getItem("Authorization")) {
    return <Navigate to="/dashboard/inicio" />;
  }

  return <>{children}</>;
};

export default RutasPublicas;
