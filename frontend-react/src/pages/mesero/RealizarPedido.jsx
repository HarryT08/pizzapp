import { useState } from "react";
import { MesasPedidos } from "../../components"
import { mesas } from "../../data/datos";

const RealizarPedido = () => {

  const [mesas2, setMesas2] = useState(mesas)
  
  return (
    <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
      {mesas2.map((item) => (
        <MesasPedidos key={item.id} mesa={item.id}/>
      ))}
    </div>
  )
}

export default RealizarPedido