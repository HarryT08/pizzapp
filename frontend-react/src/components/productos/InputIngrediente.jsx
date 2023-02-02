import { useContext, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import {DeletedButton} from '@/components/mui/Buttons';
import { TextField } from '@mui/material';

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
      <TextField
      variant="standard"
        required
        value={cantidad}
        onChange={handleChange}
        onBlur={handleBlur}
        name="cantidad"
        type="number"
      />
      <small>Gramos</small>
      <div className="flex items-center">
        <DeletedButton type="button" onClick={() => onDelete(preparacion.id)}>
          <IoIosClose size={20}/>
        </DeletedButton>
      </div>
    </div>
  );
}
