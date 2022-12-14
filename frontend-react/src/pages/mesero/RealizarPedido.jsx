import { useState, useEffect } from "react";
import { instance } from "../../api/api";
import { MesasPedidos } from "../../components";
import Alert from '@mui/material/Alert';

const RealizarPedido = () => {
  const [mesas, setMesas] = useState([]);

  const getMesas = async () => {
    try {
      const response = await instance.get("/mesas/Disponible");
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
        <Alert severity="error"><strong>No existe ninguna mesa</strong></Alert>
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
