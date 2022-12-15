import { TableCell, TableRow, Button } from '@mui/material';

export default function RowProductosMesero({ product, onAdd }) {
  let options = Object.keys(product.preparar)
    .filter((key) => product.preparar[key] > 0)
    .map((key) => {
      return (
        <option value={key} key={key}>
          {key}
        </option>
      );
    });

  const isEmpty = options.length === 0;

  if (isEmpty) {
    options = <option>No disponible</option>;
  }

  return (
    <TableRow>
      <TableCell align="center">{product.nombre}</TableCell>
      <TableCell align="center">
        {<select disabled={isEmpty} className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm">{options}</select>}
      </TableCell>
      <TableCell align="center">
        <div id="botoncito" className="flex justify-center">
          <Button disabled={isEmpty} onClick={() => onAdd(product.id)}>
            Agregar
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
