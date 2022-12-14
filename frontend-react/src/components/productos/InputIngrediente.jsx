import { useContext, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

import { SelectedProductContext } from '@/pages/admin/Productos';

export default function InputIngrediente({ preparacion, onDelete }) {
  const { setPreparaciones } = useContext(SelectedProductContext);
  const [cantidad, setCantidad] = useState(preparacion.cantidad || 1);

  const handleChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleBlur = (e) => {
    let value = Number(e.target.value.replace(/[^0-9]+/g, ''));

    if (value < 1 || isNaN(value)) {
      value = 1;
    }

    setCantidad(value);

    setPreparaciones((draft) => {
      return draft.map((it) => {
        if (
          it.id_materia === preparacion.id_materia &&
          it.tamanio === preparacion.tamanio
        ) {
          it.cantidad = value;
        }

        return it;
      });
    });
  };

  return (
    <div className="flex items-center mb-2.5 gap-5 overflow-x-auto">
      <p>{preparacion.materiaPrima.nombre}</p>
      <input
        required
        value={cantidad}
        onChange={handleChange}
        onBlur={handleBlur}
        name="cantidad"
        type="number"
        className="w-32 border-2 rounded-lg border-azul-marino/60 fo-within:border-azul-marino  focus:outline-none"
      />
      <div className="flex items-center">
        <button type="button" onClick={() => onDelete(preparacion.id)}>
          <AiFillCloseCircle className="text-rojo-fuerte/50 hover:text-rojo-fuerte cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
