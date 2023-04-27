import { bohemiaApi } from "@/api/bohemiaApi";
import { normalizeProductos } from "@/utils/productos";
import {getTokenFromLocalStorage } from '@/utils/getToken'

export async function getProductosAndPreparaciones() {
  const { data } = await bohemiaApi.get("/productos/productsAndPreparations");
  return normalizeProductos(data);
}

export async function getProductoAndPreparaciones(idProducto) {
  const response = await bohemiaApi.get(
    "/productos/productsAndPreparations/" + idProducto
  );

  const [data] = response.data;
  const selectedSizes = [];

  data.preparaciones.forEach(({ tamanio }) => {
    if (!selectedSizes.includes(tamanio)) {
      selectedSizes.push(tamanio);
    }
  });

  const producto = {
    ...data,
    selectedSizes,
  };

  return producto;
}

export function getProducts() {
  const token = getTokenFromLocalStorage();
  const jwtConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return bohemiaApi.get("/productos", jwtConfig);
}

export function createProduct(producto) {
  return bohemiaApi.post("/productos", producto);
}

export function updateProduct(producto) {
  return bohemiaApi.put(`/productos/${producto.id}`, producto);
}

export function deleteProduct(id) {
  return bohemiaApi.delete(`/productos/${id}`);
}
