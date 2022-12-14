import { useState, useEffect } from "react";
import { instance } from "../../api/api";
import Alert from '@mui/material/Alert';
import { MesasFacturar } from "../../components";

const Facturar = () => {

  const [mesas2, setMesas2] = useState([])

  const getMesas = async () => {
    try {
      const response = await instance.get("/mesas/Ocupado");
      setMesas2(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMesas();
  }, []);

  return (
    <>
      {mesas2.length === 0 ? (
        <Alert severity="error"><strong>No hay mesas disponibles para Facturar</strong></Alert>
      ) :(
        <div className='w-full'>
          <div className="mt-3">
            <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
              {
                mesas2.map((item) => (              
                  <MesasFacturar key={item.id} id={item.id} estado={item.estado} />
                ))
              }
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Facturar