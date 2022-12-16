import { useOrden } from '@/context/OrdenContext';
import { TableCell, TableRow, Button } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RowProductosMesero({ product }) {
  const [selected, setSelected] = useState(() =>
    Object.keys(product.preparar).find((key) => product.preparar[key] > 0)
  );
  const { disponibles, onAddProducto } = useOrden();
  const cantidades = disponibles[product.id] || {};

  let options = Object.keys(product.preparar)
    .filter((key) => cantidades[key] > 0)
    .map((key) => {
      return (
        <option value={key} key={key}>
          {key}
        </option>
      );
    });

  const isEmpty = options.length === 0;

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
  };

  const handleAdd = () => {
    const success = onAddProducto(product, selected);

    if (!success) {
      toast.error('El producto ya está agregado');
    }
  };

  if (isEmpty) {
    options = <option>No disponible</option>;
  }

  return (
    <TableRow>
      <TableCell align="center">{product.nombre}</TableCell>
      <TableCell align="center">
        {
          <select
            onChange={handleChange}
            disabled={isEmpty}
            className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
          >
            {options}
          </select>
        }
      </TableCell>
      <TableCell align="center">
        <div id="botoncito" className="flex justify-center">
          <Button disabled={isEmpty} onClick={handleAdd}>
            Agregar
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
