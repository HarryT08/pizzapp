import { instance } from '@/api/api';
import { MesasPedidos } from '@/components';
import { getEstadoMesas } from '@/services/mesas';
import { Alert } from '@mui/lab';
import React, { useEffect, useState } from 'react';

const EditarPedido = () => {
  const [mesas, setMesas] = useState([]);

  const getMesas = async () => {
    try {
      const data = await getEstadoMesas('Ocupado');
      setMesas(data);
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
        <Alert severity="error">
          <strong>No existe ninguna con pedidos </strong>
        </Alert>
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

export default EditarPedido;
