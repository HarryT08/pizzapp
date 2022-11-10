import { useState } from 'react';
import { instance } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { TextField } from '@mui/material';
import {BtnEdit} from '../styles/Button'
import 'react-toastify/dist/ReactToastify.css';
import logoBohemia from '../assets/img/logoBohemiaLogin.png';
import Loader from './Loader';

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
      console.log(response)
      navigate('/dashboard/');
      
      //:D
      // instance.get('/dfdfdfdf', {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   }
      // })

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full rounded-md p-3 h-100">
      <div className="flex justify-center  h-36">
        <img src={logoBohemia} alt="Logo bohemia" />
      </div>
      <div>
        <h1 className="text-xl text-black md:text-2xl 2xl:text-2xl font-medium pb-2">
          Iniciar sesion
        </h1>
        <p>Bienvenido a Pizza Bohemia.</p>
      </div>

      <form className="mt-6" onSubmit={iniciarSesion}>
        <div>
          <TextField
            fullWidth
            label="Usuario"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            autoComplete=""
            variant="filled"
          />
        </div>
        <div className="mt-4">
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
          />
        </div>
        <ToastContainer />
        <div className="mt-6">
          <BtnEdit fullWidth type="submit">
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              <>Iniciar sesion</>
            )}
          </BtnEdit>
        </div>
      </form>
      <p className="pt-12 text-sm text-black/50">
        © 2022 Pizza Bohemia. Todos los derechos reservados
      </p>
    </div>
  );
};

export default FormLogin;
