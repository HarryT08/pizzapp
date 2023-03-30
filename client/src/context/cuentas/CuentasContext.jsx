import { createContext, useReducer, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { cuentaReducer } from "./CuentasReducer";
import * as cuentasServices from "@/services/cuentas/cuentas";

export const CuentaContext = createContext();

const INITIAL_STATE = {
  cuentas: [],
  isLoading: false,
  error: null,
};

export const CuentasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cuentaReducer, INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [calledFetchCuentas, setCalledFetchCuentas] = useState(false);
  const [selectPerson, setSelectPerson] = useState(null);
  const [person, setPerson] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    celular: "",
  });

  const fetchCuentas = async () => {
    dispatch({ type: "FETCH_CUENTAS" });
    setLoading(true);
    try {
      const cuentas = await cuentasServices.getUsers();
      dispatch({
        type: "FETCH_CUENTAS_SUCCESS",
        payload: cuentas,
      });
      setLoading(false);
      return cuentas;
    } catch (error) {
      console.error(error);
      dispatch({
        type: "FETCH_CUENTAS_ERROR",
        payload: error.message,
      });
      toast.error("Ocurrio un error al obtener las cuentas");
      setLoading(false);
      return [];
    }
  };

  const deleteCuenta = async (id) => {
    try {
      await cuentasServices.deleteUser(id);
      dispatch({
        type: "DELETE_CUENTA",
        payload: id,
      });
      toast.success("Cuenta eliminada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrio un error al eliminar la cuenta");
    }
  };

  const handleGetPerson = async (id) => {
    try {
      const persona = await cuentasServices.getPersonById(id);
      if (persona) {
        dispatch({
          type: "FETCH_PERSON_SUCCESS",
          payload: persona,
        });
        setPerson(persona);
      } else {
        setPerson({
          cedula: "",
          nombre: "",
          apellido: "",
          celular: "",
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "FETCH_PERSON_ERROR",
        payload: "Ocurrió un error al obtener la persona",
      });
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      setLoading(true);
      const response = await cuentasServices.registerUser(userData);
      dispatch({
        type: "CREATE_CUENTA",
        payload: response,
      });
      fetchCuentas();
      toast.success("Cuenta creada correctamente");
      setLoading(false);
      return response;
    } catch (error) {
      console.error(error);
      toast.error("Ocurrio un error al crear la cuenta");
      setLoading(false);
    }
  };

  const handleEditUser = async (userData) => {
    try {
      setLoading(true);
      console.log("userData Context ->", userData)
      const response = await cuentasServices.updateUser(userData);
      dispatch({
        type: "UPDATE_CUENTA",
        payload: response,
      });
      fetchCuentas();
      setLoading(false);
      toast.success("Cuenta actualizada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrio un error al actualizar la cuenta");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!calledFetchCuentas) {
      fetchCuentas();
      setCalledFetchCuentas(true);
    }
  }, [calledFetchCuentas]);

  return (
    <CuentaContext.Provider
      value={{
        cuentas: state.cuentas,
        isLoading: state.isLoading,
        deleteCuenta,
        handleCreateUser,
        handleEditUser,
        handleGetPerson,
        setSelectPerson,
        selectPerson,
        loading,
        person,
      }}
    >
      {children}
    </CuentaContext.Provider>
  );
};
