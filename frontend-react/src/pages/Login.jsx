import { FormLogin } from "../components"
import pizzaLogin from '../assets/img/pizzaLogin.png';

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-loginBanner bg-cover bg-center hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen border-r border-black">
                <div className='absolute top-[22%] left-[19%] '>
                    <img src={pizzaLogin} alt="" className=' pizza'/>
                </div>
            </div>
            <div className="bg-white bg-cover bg-center w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                flex items-center justify-center">
                <FormLogin/>
            </div>
        </div>
    )
}

export default Login