import { createContext, useReducer, useEffect } from "react";
import { bohemiaApi } from "@/api/bohemiaApi";
import { ingredienteReducer } from "./IngredientesReducer";
import { toast } from "react-toastify";
import * as ingredientesServices from "@/services/ingredientes/ingredientes";
import { getTokenFromLocalStorage } from "@/utils/getToken";

const initialIngrediente = {
  ingredientes: [],
};

export const IngredienteContext = createContext(initialIngrediente);

export const IngredienteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ingredienteReducer, initialIngrediente);

  const getIngredientes = async () => {
    const token = getTokenFromLocalStorage();
    const jwtConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await bohemiaApi.get("/ingredientes", jwtConfig);
      dispatch({
        type: "GET_INGREDIENTES",
        payload: res.data,
      });
    } catch (error) {
      toast.error("Error al obtener los ingredientes");
    }
  };

  useEffect(() => {
    getIngredientes();
  }, []);

  const addIngredient = (ingrediente) => {
    dispatch({
      type: "ADD_INGREDIENTE",
      payload: ingrediente,
    });
  };

  const deleteIngrediente = (id) => {
    dispatch({
      type: "DELETE_INGREDIENTE",
      payload: id,
    });
  };

  const updateIngrediente = async (ingrediente) => {
    try {
      await ingredientesServices.updateIngredient(ingrediente);
      dispatch({
        type: "UPDATE_INGREDIENTE",
        payload: ingrediente,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IngredienteContext.Provider
      value={{
        ingredientes: state.ingredientes,
        pesajes: [
          {
            value: "G",
            label: "G",
          },
          {
            value: "Kg",
            label: "Kg",
          },
          {
            value: "Oz",
            label: "Oz",
          },
          {
            value: "Lb",
            label: "Lb",
          },
        ],
        addIngredient,
        deleteIngrediente,
        updateIngrediente,
      }}
    >
      {children}
    </IngredienteContext.Provider>
  );
};
