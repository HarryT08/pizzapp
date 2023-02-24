import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "@/api/api";
import { Link } from "react-router-dom";
import { AddedButton } from "@/components/mui/Buttons";


const columns = [
  { id: "producto", label: "Producto" },
  { id: "precioUnitario", label: "Precio unitario" },
  { id: "cantidad", label: "Cantidad" },
  { id: "precioTotal", label: "Precio total" },
];

const options = {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
};

const numberFormat = new Intl.NumberFormat("es-CO", options);

const ShowComanda = () => {
  const { id } = useParams();
  const [dataComanda, setDataComanda] = useState({});

  const getComanda = async () => {
    try {
      const response = await instance.get(`/detallecomanda/${id}`);
      setDataComanda(response.data);
      console.log("Comanda ->", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  function calcularTotalGeneral(comandas) {
    let total = 0;
    for (let i = 0; i < comandas.length; i++) {
      total += comandas[i].totalComanda;
    }
    return numberFormat.format(total);
  }

  const totalGeneral = calcularTotalGeneral(dataComanda);

  useEffect(() => {
    getComanda();
  }, []);
  return (
    <>
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
              <th
                key={column.id}
                className="text-[#3E5571] font-semibold border border-[#91A7BF]/20"
              >
                {column.label}
              </th>
            ))}
          </tr>
          {Object.entries(dataComanda).map(([key, value]) => (
            <tr key={key} className="bodyTable">
              <td className="text-[#3E5571]  border border-[#91A7BF]/20">
                {value.producto.nombre}
              </td>
              <td className="text-[#3E5571]  border border-[#91A7BF]/20">
                {numberFormat.format(value.totalComanda / value.cantidad)}
              </td>
              <td className="text-[#3E5571]  border border-[#91A7BF]/20">
                {value.cantidad}
              </td>
              <td className="text-[#3E5571]  border border-[#91A7BF]/20">
                {numberFormat.format(value.totalComanda)}
              </td>
            </tr>
          ))}
        </table>
        <div className="flex items-center gap-2 justify-end">
          <span>Total a pagar:</span>
          <div className="px-3 py-2 bg-[#fff] border border-[#91A7BF]/20 rounded-md">
            <span>{totalGeneral}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/admin/ordenes">
          <AddedButton variant="outlined">
            Regresar
          </AddedButton>
        </Link>
      </div>
    </>
  );
};

export default ShowComanda;
