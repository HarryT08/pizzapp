import "../../styles/aditional-styles/table.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { instance } from "@/api/api";
import { Loader } from "@/components";

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

const Factura = () => {
  const [dataMesa, setDataMesa] = useState({ detalleComanda: [] });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getComanda = async () => {
    const response = await instance.get(`/comanda/${id}`, {
      params: { estado: "Abierta" },
    });
    setDataMesa(response.data);
    console.log("Comanda ->", response.data)
  };

  const updateStateComanda = async () => {
    try{
      setLoading(true);
      await instance.put(`/comanda/${id}`, {
        estado: "Facturado",
      });
      updateMesa();
      setTimeout(() => 
        {
          navigate("/admin/facturar");
          setLoading(false);
        }
      , 1000);
    }catch(err){
      console.log("Error en updateStateComanda " + err);
      setLoading(false);
    }
  };

  const updateMesa = async () => {
    await instance.put(`/mesas/${id}`, {
      estado: "Disponible",
    });
  };

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
          {dataMesa.detalleComanda.map((detalle) => (
            <tr key={detalle.id} className="bodyTable">
              <td className="text-[#3E5571]  border border-[#91A7BF]/20">
                {detalle.producto.nombre}
              </td>
              <td className="text-[#3E5571]  border border-[#91A7BF]/20">
                {numberFormat.format(detalle.totalComanda / detalle.cantidad)}
              </td>
              <td className="text-[#3E5571]  border border-[#91A7BF]/20">
                {detalle.cantidad}
              </td>
              <td className="text-[#3E5571]  border border-[#91A7BF]/20">
                {numberFormat.format(detalle.totalComanda)}
              </td>
            </tr>
          ))}
        </table>
        <div className="flex items-center gap-2 justify-end">
          <span>Total a pagar:</span>
          <div className="px-3 py-2 bg-[#fff] border border-[#91A7BF]/20 rounded-md">
            <span className="text-xl font-medium">
              {numberFormat.format(dataMesa.total)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-6 justify-between">
        <div>
          <Link to="/admin/facturar" className="btn">
            Regresar
          </Link>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={updateStateComanda} className="btn">
            {loading ? <Loader /> : "Facturar"}
          </button>
          <button type="button" onClick={() => window.print()} className="btn">
            Imprimir
          </button>
        </div>
      </div>
    </>
  );
};

export default Factura;
