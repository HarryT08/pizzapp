export const calcularDisponiblesRestantes = ({
  producto,
  cantidad: cantidadProducto,
  tamanio: tamanioSolicitado
}) => {
  const disponibles = {};

  const cantidadIngredientes =
    producto.preparaciones.find(
      (preparacion) => preparacion.tamanio === tamanioSolicitado
    )?.cantidad || 0;

  for (const preparacion of producto.preparaciones) {
    const { tamanio, materiaPrima } = preparacion;
    const { existencia } = materiaPrima;

    let maxToPrepare =
      (existencia - cantidadIngredientes * cantidadProducto) /
      preparacion.cantidad;

    maxToPrepare = Math.floor(maxToPrepare);

    if (disponibles[tamanio] === undefined) {
      disponibles[tamanio] = maxToPrepare;
    }

    disponibles[tamanio] = Math.min(disponibles[tamanio], maxToPrepare);
  }

  console.log(disponibles, tamanioSolicitado);
  return disponibles;
};
