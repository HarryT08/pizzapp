import { bohemiaApi } from "@/api/bohemiaApi";

export const getComandas = async () => {
  const response = await bohemiaApi.get("/comanda");
  return response.data;
};

export const comandaById = (id) => {
  return bohemiaApi.get(`/detallecomanda/${id}`);
};
