import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"
const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState('')
    const {setAuth} = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        try{
            const {data} = await clienteAxios.post('/veterinarios/login',{email, password});
            /*OJO!!! Se almacena el token en el localStorage */
            localStorage.setItem('token', data.token)
            console.log('aqui ',data)
            setAuth(data)
            navigate('/admin')

        }catch(error){
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

        }


    }
    const {msg} = alerta /*Para que se use dentro del return*/
  return (
    <>
        <div>
            <h1 className = "text-indigo-600 font-black text-6xl">Inicia Sesión y Administra {""}    
                <span className="text-black"> tus Pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <  Alerta
                alerta = {alerta}
            />}
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input
                        type= "email"
                        placeholder="Email de Registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value = {email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input
                        type= "pasword"
                        placeholder="Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value = {password}
                        onChange={e=>setPassword(e.target.value)}
                    />

                    <input
                        type= "submit"
                        value="Iniciar sesión"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5
                        hover: cursor-pointer hover:bg-indigo-800 md:w-auto "
                    />
                </div>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">{/* Esto es para poner un enlace uno al lado del otro*/}
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to ="/registrar">¿No tienes una cuenta? Registrate</Link>
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to ="/olvide-password">Olvide mi password</Link>
            </nav>
        </div>
    </>
  )
}

export default Login