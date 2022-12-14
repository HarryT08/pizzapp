import { useContext } from 'react';
import { SelectedProductContext } from '@/pages/admin/Productos';

export default function TabProducto() {
  const { producto, setProducto } = useContext(SelectedProductContext);

  return (
    <>
      <div className="flex flex-col">
        <label className="block text-base font-medium">Nombre</label>
        <input
          required
          name="nombre"
          type="text"
          placeholder="Nombre"
          className="block p-3 w-full flex-1 rounded-md border-azul-marino/70 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
          value={producto.nombre}
          onChange={(e) =>
            setProducto((current) => ({
              ...current,
              nombre: e.target.value
            }))
          }
        />
      </div>
      <div className="flex flex-col mt-2">
        <label className="block text-base font-medium">Precio</label>
        <input
          required
          name="costo"
          type="number"
          placeholder="Precio"
          className="block p-3 w-full flex-1 rounded-md border-azul-marino/70 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
          value={producto.costo}
          onChange={(e) =>
            setProducto((current) => ({
              ...current,
              costo: Number(e.target.value.replace(/[^0-9]+/g, ''))
            }))
          }
        />
      </div>
    </>
  );
}
