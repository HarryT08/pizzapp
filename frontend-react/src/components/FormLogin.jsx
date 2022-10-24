import { useState, useEffect } from "react";
import { instance } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import logoBohemia from "../assets/img/logoBohemiaLogin.png";
import Loader from "./Loader";


const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  


  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
        await instance.post("/auth/login", {
        username: username,
        password: password,
      })
      setLoading(true);
      navigate("/dashboard/");
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-md p-3 h-100">
      <div className="flex justify-center  h-36">
        <img src={logoBohemia} alt="Logo bohemia"/>
      </div>
      <div >
        <h1 className="text-xl text-black md:text-2xl 2xl:text-2xl font-medium pb-2">
          Iniciar sesion
        </h1>
        <p>Bienvenido a Pizza Bohemia.</p>
      </div>

      <form className="mt-6" onSubmit={iniciarSesion}>
        <div>
          <label className="block text-gray-700 text-lg">Usuario</label>
          <input
            type="text"
            placeholder="Nombre usuario"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
            autoFocus
            autoComplete=""
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-lg">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
        </div>
        <ToastContainer />
        <button
          type="submit"
          className="w-full block text-center bg-naranja-vivido border-2 border-naranja-vivido hover:bg-white hover:text-naranja-vivido rounded-md text-white font-semibold text-14 2xl:text-2xl px-3 py-2 mt-6 transition duration-300 ease-in-out"
        >
          Iniciar sesion
          {loading && <Loader />}
        </button>
      </form>
      <p className="pt-12">© 2022 Pizza Bohemia. Todos los derechos reservados</p>
    </div>
  );
};

export default FormLogin;
