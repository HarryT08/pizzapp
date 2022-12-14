import { useContext, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { SelectedProductContext } from '@/pages/admin/Productos';

export default function InputIngrediente({ item, size, onDelete }) {
  const { selectedProduct } = useContext(SelectedProductContext);

  const [cantidad, setCantidad] = useState(() => {
    const ingrediente = selectedProduct.preparaciones.find(
      (iterator) =>
        iterator.id_materia === item.id && iterator.tamanio === size.key
    );

    return ingrediente?.cantidad || 0;
  });

  const handleChange = (e) => {
    //Quitar las letras y los espacios
    let value = e.target.value;
    value = value.replace(/([a-zA-Z]|\s)+/, '');
    value = Number(value);

    setCantidad(value);

    // setCarrito((current) => {
    //   return current.map((currentItem) => {
    //     if (currentItem.id !== ingrediente.id) return currentItem;
    //     return { ...currentItem, [size.key]: value };
    //   });
    // });
  };

  const handleBlur = (e) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      return toast.error('La cantidad no es un valor válido.');
    }
  };

  return (
    <div className="flex items-center mb-2.5 gap-5 overflow-x-auto">
      <p>{item.nombre}</p>
      <input
        required
        onChange={handleChange}
        value={cantidad}
        defaultValue={cantidad}
        name="cantidad"
        type="number"
        className="w-32 border-2 rounded-lg border-azul-marino/60 fo-within:border-azul-marino  focus:outline-none"
        onBlur={handleBlur}
      />
      <div className="flex items-center">
        <button type="button" onClick={() => onDelete(item.id)}>
          <AiFillCloseCircle className="text-rojo-fuerte/50 hover:text-rojo-fuerte cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
