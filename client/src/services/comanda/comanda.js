import { bohemiaApi } from "@/api/bohemiaApi";

export const createComandas = async (comanda) => {
    console.log("comanda", comanda)
    return await bohemiaApi.post("/comanda", comanda);
    
}
