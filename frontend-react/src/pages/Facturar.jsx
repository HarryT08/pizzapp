import { useState } from "react"
import { mesas } from "../data/datos"
import {GiKnifeFork} from 'react-icons/gi'

const Facturar = () => {

  const [mesas2, setMesas2] = useState(mesas)

  return (
    <div className='w-full'>
      <div className="mt-3">
        <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
          {
            mesas2.map((item) => (
              <div key={item.id} className='card-producto'>
                {/* Numero de la mesa */}
                <div className="flex justify-end">
                  <p className="border-2 border-rojo-fuerte bg-rojo-fuerte/20 font-medium rounded-full px-4 py-1 m-1">Mesa {item.id}</p>
                </div>

                {/* Cuerpo carta */}
                <div className="flex justify-center items-center ">
                  <div className="border-2 border-black w-max p-7 rounded-full">
                    <GiKnifeFork size={40}/>
                  </div>
                </div>

                <div className="flex justify-center my-5">
                  <p className="border-2 border-rojo-fuerte bg-rojo-fuerte/20 font-medium rounded-full px-4 py-1 m-1">{item.valor}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Facturar