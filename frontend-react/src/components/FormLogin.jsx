import { Link } from "react-router-dom";

const FormLogin = () => {
    return (
    <div className="w-full h-100">
    <h1 className="text-xl font-bold">Login Bohemia</h1>
    <h1 className="text-xl md:text-2xl 2xl:text-2xl font-bold mt-12">
        Ingresa tu cuenta
    </h1>

    <form className="mt-6">
        <div>
            <label className="block text-gray-700 text-lg">
            Correo electronico
            </label>
            <input
            type="email"
            placeholder="Correo electronico"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
            autoFocus
            autoComplete=""
            required
            />
        </div>
        <div className="mt-4">
            <label className="block text-gray-700 text-lg">Contraseña</label>
            <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
            required
    />
        </div>
        <Link to={'/dashboard/inicio'} className="w-full block text-center bg-blue-700 text-white font-semibold text-14 2xl:text-lg px-3 py-2 mt-6">
            Iniciar sesion
        </Link> 
    </form>
    </div>
    );
};

export default FormLogin;
