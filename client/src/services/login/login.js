import { bohemiaApi } from "@/api/bohemiaApi";

export const loginUser = async (user) => {
  const response = await bohemiaApi.post("/auth/login", user);
  const { token } = response.data
  localStorage.setItem('jwttoken', token);
  return response;
};
