import { dataFactura } from "@/data/datos";
import {useParams} from 'react-router-dom'
import '../../styles/aditional-styles/table.css'

const columns = [
  { id: "producto", label: "Producto" },
  { id: "precioUnitario", label: "Precio unitario" },
  { id: "cantidad", label: "Cantidad" },
  { id: "precioTotal", label: "Precio total" },
];

const Factura = () => {
  const {id} = useParams()

  return (
    <div className="bg-[#E7EDF5] w-full p-3">
      <div className="flex flex-col items-center">
        <h1 className="text-[#3E5571] text-2xl font-bold">
          Comprobante de venta
        </h1>
        <span className="bg-white rounded-md px-3">Mesa N°{id}</span>
      </div>
      <table className="w-full my-6">
        <tr>
          {columns.map((column) => (
            <th key={column.id} className="text-[#3E5571] font-semibold border border-[#91A7BF]/20">
              {column.label}
            </th>
          ))}
        </tr>
        {dataFactura.map((factura) => (
          <tr key={factura.id} className='bodyTable'>
            <td className="text-[#3E5571]  border border-[#91A7BF]/20">
              {factura.nombreProducto}
            </td>
            <td className="text-[#3E5571]  border border-[#91A7BF]/20">
              {factura.precioUnitario}
            </td>
            <td className="text-[#3E5571]  border border-[#91A7BF]/20">
              {factura.cantidad}
            </td>
            <td className="text-[#3E5571]  border border-[#91A7BF]/20">
              {factura.precioTotal}
            </td>
          </tr>
        ))}
      </table>
      <div className="flex items-center gap-2">
        <span>Total a pagar:</span>
        <div className="px-3 py-2 bg-[#fff] border border-[#91A7BF]/20 rounded-md">
          <span className="text-xl font-medium">
            $150.000
          </span>
        </div>
      </div>
    </div>
  );
};

export default Factura;
