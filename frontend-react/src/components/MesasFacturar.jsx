import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

const MesasFacturar = ({ id, estado }) => {
  return (
    <Link to={`/admin/ver-factura/${id}`}>
      <div key={id} className='card-producto'>
        {/* Numero de la mesa */}
        <div className="flex justify-end">
            <p className="border-2 border-rojo-fuerte bg-rojo-fuerte/20 font-medium rounded-full px-4 py-1 m-1">
                {estado}
            </p>
        </div>

        {/* Cuerpo carta */}
        <div className="flex justify-center items-center ">
            <div className="border-2 border-black w-max p-7 rounded-full">
            <GiKnifeFork size={40}/>
            </div>
        </div>

        <div className="flex justify-center my-5">
            <p className="border-2 border-rojo-fuerte bg-rojo-fuerte/20 font-medium rounded-full px-4 py-1 m-1">Mesa {id}</p>
        </div>
        </div>
    </Link>
  );
};

export default MesasFacturar;