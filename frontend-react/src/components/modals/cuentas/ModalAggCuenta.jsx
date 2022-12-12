import { useState } from "react";
import { Modal, Fade } from "@mui/material";
import { Loader } from "../..";
import { instance } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalAggCuenta = ({
  modalOpen,
  getUsers,
  handleCloseModal,
}) => {
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
    handleCloseModal();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleReset}
        closeAfterTransition
      >
        <Fade in={modalOpen}>
          <div className="modal">
            <div className="header-modal">
              <h3 className="text-xl font-semibold">Agregar Usuario</h3>
            </div>
            <form id="formUser" onSubmit={registerUser}>
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
                  <label className="block text-base font-medium">
                    Apellido
                  </label>
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
                  <label className="block text-base font-medium">
                    Telefono
                  </label>
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
                  <label className="block text-base font-medium">
                    Contraseña
                  </label>
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
                  {loading ? <Loader /> : "Agregar usuario"}
                </button>
                <span
                  className="btnCancel cursor-pointer"
                  onClick={handleReset}
                >
                  Cancelar
                </span>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalAggCuenta;
