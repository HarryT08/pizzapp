import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';

export default function RowCarritoProductos({ product, onDelete, onChange }) {
  const [cantidad, setCantidad] = useState(product.cantidad || 1);

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]+/g, '');
    setCantidad(value);
    onChange(product.id, value);
  };

  const handleAdd = (sum) => {
    const delta = sum ? 1 : -1;

    if (cantidad + delta < 1) return;
    
    setCantidad(cantidad + delta);
    onChange(product.id, cantidad + delta);
  };

  return (
    <TableRow>
      <TableCell align="center">{product.nombre}</TableCell>
      <TableCell align="center">
        <div className="flex gap-5 justify-center">
          <button type='button' onClick={() => handleAdd(false)} className="rounded-full p-1 px-2.5 text-sm border-2 border-rojo-fuerte/20 bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white cursor-pointer">
            -
          </button>
          <input type="number" value={cantidad} onChange={handleChange} className="w-16 h-7" />
          <button type='button' onClick={handleAdd} className="rounded-full p-1 px-2.5 text-sm border-2 border-verde-profundo/20 bg-verde-profundo/20 text-verde-profundo font-bold transition duration-300 ease-in-out hover:bg-verde-profundo hover:text-white cursor-pointer">
            +
          </button>
        </div>
      </TableCell>
      <TableCell align="center">
        <div className="flex gap-5 justify-center">
          <button
            className="rounded-full p-1 px-2.5 text-sm border-2 border-rojo-fuerte/20 bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white cursor-pointer"
            onClick={() => onDelete(product.id)}
          >
            <BsTrashFill className='h-6' />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
