import { createContext, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { authReducer } from "./AuthReducer";
import * as loginServices from "@/services/login/login";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await loginServices.loginUser(data);
      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem("Authorization", token);
      const decodedToken = jwtDecode(token);
      const role = decodedToken.cargo;
      localStorage.setItem("cargo", role);
      dispatch({ type: "LOGIN", payload: { user: user, token: token } });
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "mesero") {
        navigate("/mesero");
      }
      toast.success("Inicio de sesion exitoso");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error al iniciar sesion");
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, loading, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
