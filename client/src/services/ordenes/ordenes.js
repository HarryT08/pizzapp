import { bohemiaApi } from "@/api/bohemiaApi";
import {getTokenFromLocalStorage } from '@/utils/getToken'


export const getComandas = async () => {
  const token = getTokenFromLocalStorage();
  const jwtConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await bohemiaApi.get("/comanda", jwtConfig);
  return response.data;
};

export const comandaById = (id) => {
  return bohemiaApi.get(`/detallecomanda/${id}`);
};
