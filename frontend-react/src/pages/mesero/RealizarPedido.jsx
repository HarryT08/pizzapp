import { useState, useEffect } from "react";
import { instance } from "../../api/api";
import { MesasPedidos } from "../../components";

const RealizarPedido = () => {
  const [mesas, setMesas] = useState([]);

  const getMesas = async () => {
    try {
      const response = await instance.get("/mesas");
      setMesas(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMesas();
  }, []);

  return (
    <>
      {mesas.length === 0 ? (
        <p className="text-center">No existe ninguna mesa</p>
      ) : (
        <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
          {mesas.map((item) => (
            <MesasPedidos key={item.id} id={item.id} estado={item.estado} />
          ))}
        </div>
      )}
    </>
  );
};

export default RealizarPedido;
