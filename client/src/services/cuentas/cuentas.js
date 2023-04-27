import { bohemiaApi } from "@/api/bohemiaApi";
import {getTokenFromLocalStorage } from '@/utils/getToken'
export const getUsers = async () => {
  const token = getTokenFromLocalStorage();
  const jwtConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await bohemiaApi.get("/usuarios", jwtConfig);
  return response.data;
};

export const deleteUser = async (id) => {
  return await bohemiaApi.delete(`/usuarios/${id}`);
};

export const getPersonById = async (id) => {
  const response = await bohemiaApi.get(`/personas/${id}`);
  return response.data;
};

export const registerUser = async (userData) => {
  try {
    const response = await bohemiaApi.post("/usuarios", userData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await bohemiaApi.put("/usuarios", userData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
