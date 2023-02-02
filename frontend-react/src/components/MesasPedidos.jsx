import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';

const MesasPedidos = ({ id, estado }) => {
  const colorEstado = estado === 'Disponible' ? '[#008000]' : 'rojo-fuerte';

  return (
    <Link to={`/mesero/tomar-orden/${id}`}>
      <div className="card-producto">
        {/* Numero de la mesa */}
        <div className="flex justify-end mt-2">
          <p
            className={`bg-${colorEstado}/20 text-${colorEstado} font-medium rounded-full px-4 py-1 m-1`}
          >
            {estado}
          </p>
        </div>

        {/* Cuerpo carta */}
        <div className="flex justify-center items-center ">
          <div className="border-2 border-black w-max p-7 rounded-full">
            <GiKnifeFork size={40} />
          </div>
        </div>

        <div className="flex justify-center my-3">
          <p className="bg-azul-marino/20 text-azul-marino font-medium rounded-full px-4 py-1 m-1">
            Mesa {id}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MesasPedidos;
