import { bohemiaApi } from "@/api/bohemiaApi";

export const loginUser = (user) => {
  return bohemiaApi.post("/auth/login", user);
};
