import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

export default function RowCarritoProductos({ product, onDelete, onChange }) {
  const [cantidad, setCantidad] = useState(product.cantidad || 1);

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]+/g, '');
    setCantidad(value);
    onChange(product.id, value);
  };

  return (
    <TableRow>
      <TableCell align="center">{product.nombre}</TableCell>
      <TableCell align="center">
        <input type="number" value={cantidad} onChange={handleChange} />
      </TableCell>
      <TableCell align="center">
        <div className="flex gap-5 justify-center">
          <button
            className="rounded-full p-1 px-2.5 text-sm border-2 border-rojo-fuerte/20 bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white cursor-pointer"
            onClick={() => onDelete(product.id)}
          >
            -
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
