import { useState } from "React"
import { useStateContext } from '../context/ContextProvider';
import { FiSearch } from "react-icons/fi";
import BotonModal from "../components/modals/BotonModal";
import { dataProductos } from "../data/datos";
import Swal from "sweetalert2";

const Productos = () => {

  const { handleDelete, data} = useStateContext();

  const [state, setState] = useState({
    query: "",
    list: []
  });

  const handleChange = (e) => {
    const results = dataProductos.filter((item) => {
      if(e.target.value === "") return dataProductos;
      return item.nombre.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setState({
      query: e.target.value,
      list: results
    });
  }

  const showAlert = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#D00000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
      }
    });
  }

  return (
    <div className="w-full p-3">
      {/* Barra busqueda */}
      <div className="flex justify-between py-3 border-b-2">
        <form action="">
          <div className="relative flex items-center text-gray-400 focus-within:text-azul-marino border-2 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino">
            <input
              type="text"
              onChange={handleChange} value={state.query}
              placeholder="Busqueda"
              className="px-3 py-2 placeholder-gray-500 text-black rounded-lg border-none focus:outline-none"
            />
            <FiSearch className="w-5 h-5 mr-3" />
          </div>
        </form>
      </div>

      {/* Boton agg ingredientes */}
      <div className="mt-8">
        <BotonModal/>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
          {/*  <ul>
            {(state.query === ' ' ? "Ninguna publicación coincide con la consulta" : !state.list.length ? 'No se encontro ninguna consulta' : state.list.map((item) => {
              return (
                <li key={item.id} className="flex flex-col items-center gap-3">
                  <img src={item.img} alt={item.nombre} className="w-32 h-32" />
                  <p className="text-center text-azul-marino font-bold">{item.nombre}</p>
                  <p className="text-center text-azul-marino font-bold">{item.precio}</p>
                  <button onClick={() => showAlert(item.id)} className="bg-azul-marino text-white font-bold py-2 px-4 rounded-full">Eliminar</button>
                </li>
              )
            }))}
          </ul> */}
          {data.map((item) => (
              <div key={item.id} className="card-producto">
                <div className="container-img">
                  <img
                    src={item.img}
                    alt="Foto producto"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <hr className="border-2 border-rojo-fuerte" />
                </div>
                <div className="card-body">
                  <h1 className="text-xl font-extrabold text-center">
                    {item.nombre}
                  </h1>
                  <p className="mt-1 text-center px-2 py-1 bg-verde-profundo w-max text-white font-semibold text-lg rounded-lg">
                    {item.precio}
                  </p>
                </div>
                <div className="card-buttons flex justify-center gap-5 py-3">
                  <button className="editar">Editar</button>
                  <button className="eliminar" onClick={() => showAlert(item.id)}> Eliminar </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Productos;
