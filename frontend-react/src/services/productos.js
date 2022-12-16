import { instance } from '@/api/api';

export async function getProductosAndPreparaciones() {
  const { data } = await instance.get('/productos/productsAndPreparations');

  const ingredientes = {};
  const disponible = {};

  data.forEach((producto) => {
    disponible[producto.id] = producto.preparar;

    producto.preparaciones.forEach(
      (preparacion) =>
        (ingredientes[preparacion.id_materia] = preparacion.materiaPrima)
    );
  });

  return {
    productos: data,
    ingredientes,
    disponible
  };
}

export async function getProductoAndPreparaciones(idProducto) {
  const response = await instance.get(
    '/productos/productsAndPreparations/' + idProducto
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

export function updateProduct(producto) {
  return instance.put(`/productos/${producto.id}`, producto);
}
