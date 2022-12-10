import React from "react";
import { GiKnifeFork } from "react-icons/gi";

const MesasPedidos = ({ mesa }) => {
  return (
    <div className="card-producto">
      {/* Numero mesa */}
      <div className="flex justify-end">
        <p className="border-2 border-azul-marino bg-azul-marino/20 font-medium rounded-full px-4 py-1 m-1">
          Mesa {mesa}
        </p>
      </div>

      {/* Cuerpo carta */}
      <div className="flex justify-center items-center">
        <div className="border-2 border-black w-max p-7 rounded-full mb-5">
          <GiKnifeFork size={40} />
        </div>
      </div>
    </div>
  );
};

export default MesasPedidos;
