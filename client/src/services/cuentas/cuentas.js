import { bohemiaApi } from "@/api/bohemiaApi";

export const getUsers = async () => {
  const response = await bohemiaApi.get("/usuarios");
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
