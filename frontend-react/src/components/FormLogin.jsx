import { useState } from 'react';
import { instance } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components';
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await instance.post('/auth/login', {
        username: username,
        password: password
      });
      localStorage.setItem('Authorization', response.data.token);
      const decoded = jwt_decode(response.data.token);
      localStorage.setItem('cargo', decoded.cargo);
      if (decoded.cargo === 'admin') {
        navigate('/admin/');
      } else if (decoded.cargo === 'mesero') {
        navigate('/mesero/');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-md p-3 h-100">
      <div>
        <h1 className="text-xl text-black md:text-2xl 2xl:text-2xl font-bold pb-2">
          Iniciar sesion
        </h1>
        <p>
          Bienvenido a <b>Pizza Bohemia.</b>
        </p>
      </div>

      <form className="mt-3" onSubmit={iniciarSesion}>
        <div className="flex flex-col">
          <label className="block text-base font-medium">Usuario</label>
          <input
            type="text"
            placeholder="Usuario"
            className="block p-3 w-full flex-1 rounded-md border-azul-marino/70 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            autoComplete=""
          />
        </div>
        <div className="mt-4 flex flex-col">
          <label className="block text-base font-medium">Contrase??a</label>
          <input
            type="password"
            placeholder="Contrase??a"
            className="block p-3 w-full flex-1 rounded-md border-azul-marino/70 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ToastContainer />
        <div className="mt-6">
          <button className="btnLogin" type="submit">
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              <>Iniciar sesion</>
            )}
          </button>
        </div>
      </form>
      <p className="pt-3 text-sm text-black/50 font-semibold">
        ?? 2022 Pizza Bohemia. Todos los derechos reservados
      </p>
    </div>
  );
};

export default FormLogin;
