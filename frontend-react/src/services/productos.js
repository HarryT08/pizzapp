import { instance } from '@/api/api';

export async function getProductoAndPreparaciones(idProducto) {
  const response = await instance.get(
    '/productos/productsAndPreparations/' + idProducto
  );

  const { costo, ...rest } = response.data;
  const selectedSizes = [];

  response.data.preparaciones.forEach(({ tamanio }) => {
    if (!selectedSizes.includes(tamanio)) {
      selectedSizes.push(tamanio);
    }
  });

  const producto = {
    ...rest,
    precio: costo,
    selectedSizes
  };

  return producto;
}

export function getProducts() {
  return instance.get('/productos');
}

export function createProduct(producto) {
  return instance.post('/productos', producto);
}
