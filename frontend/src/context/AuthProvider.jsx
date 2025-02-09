import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)


    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            setCargando(true)

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)

                // navigate('/proyectos')

            } catch (error) {
                setAuth({})
            } 

            setCargando(false)

        }
        autenticarUsuario()
    }, [])

    const cerrarSesionAuth = () => {
        localStorage.removeItem('token')
        setAuth({})
    }


    return (
        <>
        <AuthContext.Provider

            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
        </>

        
    )
}

export {
    AuthProvider
};

export default AuthContext;

/*Puedes crear  tus propias funciiones y pasarlas por el context y hacerlas
disponibles en diferentes lugares, osea desde cualquier lado lo puedo utilizar */