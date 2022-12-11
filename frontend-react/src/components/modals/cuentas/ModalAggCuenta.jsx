import { useRef, useState } from "react";
import { Transition, Loader } from "../..";
import { instance } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalAggCuenta = ({ id, modalOpen, setModalOpen, getUsers }) => {

  const modalContent = useRef(null);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    idRol: "1",
    password: "",
    username: "",
    cedula: "",
    celular: "",
    found: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Peticion GET by ID
  const getPerson = async (e) => {
    e.preventDefault();
    try {
      let cedu = usuario.cedula;
      if (cedu.length >= 1) {
        const response = await instance.get(`/personas/${cedu}`);
        if (response.data) {
          return setUsuario({
            ...response.data,
            found: true,
          });
        }
      }
      return setUsuario({
        nombre: "",
        apellido: "",
        cedula: usuario.cedula,
        celular: "",
        idRol: "1",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Peticion POST
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await instance.post("/usuarios", usuario);
      getUsers();
      toast.success("Usuario registrado con exito");
      handleReset();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReset = () => {
    document.getElementById("formUser").reset();
    setUsuario({
      id: "",
      nombre: "",
      apellido: "",
      idRol: "1",
      password: "",
      username: "",
      cedula: "",
      celular: "",
      found: false,
    });
    setModalOpen(false)
  }

  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      >
        <Transition
          id={id}
          className="fixed inset-0 z-50 overflow-hidden flex items-center top-20 mb-4 justify-center transform px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          show={modalOpen}
          enter="transition ease-in-out duration-200"
          enterStart="opacity-0 translate-y-4"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveStart="opacity-100 translate-y-0"
          leaveEnd="opacity-0 translate-y-4"
        >
          <div
            ref={modalContent}
            className="bg-white border border-slate-700 overflow-auto max-w-2xl p-3 max-h-full rounded shadow-lg"
          >
            <div className="header-modal">
              <h3 className="text-xl font-semibold">Agregar Usuario</h3>
            </div>
            <form id='formUser' onSubmit={registerUser}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-2">
              <label className="block text-base font-medium">Cedula</label>
              <input
                type="number"
                name="cedula"
                placeholder="Cedula"
                onChange={handleChange}
                onBlur={getPerson}
                className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
              />
            </div>
            <div className="mt-2">
              <label className="block text-base font-medium">Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
                value={usuario.nombre}
                disabled={usuario.found}
                className={`form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm `}
                required
              />
            </div>
            <div className="mt-2">
              <label className="block text-base font-medium">Apellido</label>
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                onChange={handleChange}
                value={usuario.apellido}
                disabled={usuario.found}
                className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                required
              />
            </div>
            <div className="mt-2">
              <label className="block text-base font-medium">Telefono</label>
              <input
                type="number"
                name="celular"
                placeholder="Telefono"
                onChange={handleChange}
                value={usuario.celular}
                className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                required
              />
            </div>
            <div className="mt-2">
              <label className="block text-base font-medium">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
                className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
              />
            </div>
            <div className="mt-2">
              <label className="block text-base font-medium">Usuario</label>
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                onChange={handleChange}
                className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                required
              />
            </div>
            <div className="flex flex-col mt-2">
              <label className="block text-base font-medium">Cargo</label>
              <select
                name="idRol"
                onChange={handleChange}
                className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                required
              >
                <option value="1">Mesero</option>
                <option value="2">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex pt-3 gap-3">
            <button className="btn" type="submit">
              {loading ? <Loader/> : "Agregar usuario"}
            </button>
            <span className="btnCancel cursor-pointer" onClick={handleReset}>
              Cancelar
            </span>
          </div>
        </form>
          </div>
        </Transition>
      </Transition>
    </>
  );
};

export default ModalAggCuenta;
