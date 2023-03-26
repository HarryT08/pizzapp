import { bohemiaApi } from "@/api/bohemiaApi";

export const createIngredient = (producto) => {
    return bohemiaApi.post("/ingredientes", producto);
}

export const deleteIngredient = (id) => {
    return bohemiaApi.delete(`/ingredientes/${id}`);
}

export const updateIngredient = (ingrediente) => {
    return bohemiaApi.put(`/ingredientes/${ingrediente.id}`, ingrediente);
}