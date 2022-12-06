import { Navigate } from "react-router-dom";

const RutasPublicas = ({ children }) => {
  if (localStorage.getItem("Authorization")) {
    return <Navigate to="/admin/inicio" />;
  }

  return <>{children}</>;
};

export default RutasPublicas;
