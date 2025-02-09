import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams()

  const {token} = params

  /*va a cargarse cuando el componente cargue que se ejecute una sola vez*/ 
  useEffect(() => {
    /*validar el token cuando el usuario cambia su password*/

    const comprobarToken = async() => {

      try{
        await clienteAxios (`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nuevo password'
        })

        /*Si llega aqui es que es valido */
        setTokenValido(true)

      }catch(error){
        setAlerta({msg: 'Hubo un error con el enlace', error: true})
      }

    }
    comprobarToken()
    /*Creo que la llamada a esa función es para que se llame una sola vez */
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(password.length < 6 ){
      setAlerta({
        msg: 'El password debe ser mínimo de 6 caracteres',
        error: true
      })

      return;
    }

    /*Para intercatuar con nuestra API */
    try {

      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url,{
        password
      })
      setAlerta({
        msg: data.msg,
        error: false
      })

      setPasswordModificado(true)

    }catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  /*Voy a extraer el mensaje */
  const {msg} = alerta
  return (
    <>
      <div>
        <h1 className = "text-indigo-600 font-black text-6xl">Reestablece tu password y no pierdas acceso a {""} 
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/*Lo vas a mostrar dentro del form la alerta */}
        {msg && <Alerta
            alerta = {alerta}
          />}
        {/*Si el token no es válido no debe aparecer nada */}
        {tokenValido && (
          <>
            <form onSubmit = {handleSubmit}>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nuevo password
                        </label>
                          <input
                              type= "password"
                              placeholder=" Tu nuevo Password"
                              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                              value = {password}
                              onChange={e => {setPassword(e.target.value)}}
                          />
                          <input
                            type= "submit"
                            value="Guardar Nuevo Password"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5
                            hover: cursor-pointer hover:bg-indigo-800 md:w-auto "
                          />
                    </div>
            </form>
          
          </>/*El fragment lo pones porque estas devolviendo el formulario y el link */
        )}

        {passwordModificado && (
          <Link 
          className="block text-center my-5 text-gray-500"
          to ="/"> Inicia Sesión
          </Link>
        )}
        
      </div>
        </>
    
)
}

export default NuevoPassword