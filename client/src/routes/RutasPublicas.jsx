import { Navigate } from "react-router-dom";

const RutasPublicas = ({ children }) => {
  if (
    localStorage.getItem("Authorization") &&
    localStorage.getItem("cargo") === "admin"
  ) {
    return <Navigate to="/admin/inicio" />;
  } else if (
    localStorage.getItem("Authorization") &&
    localStorage.getItem("cargo") === "mesero"
  ) {
    return <Navigate to="/mesero/realizar-pedido" />;
  }

  return <>{children}</>;
};

export default RutasPublicas;
