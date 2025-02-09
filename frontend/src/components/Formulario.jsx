import { useState } from "react"
import usePacientes from "../hooks/usePacientes"
import Alerta from './Alerta'
const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [alerta, setAlerta] = useState({})
    const {guardarPaciente} = usePacientes()

    const handleSubmit = e =>{
        e.preventDefault();

        //validar el formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        /*set alerta va a volver a ser vacio */
        setAlerta({})
        guardarPaciente({nombre, propietario, email, fecha, sintomas})
    }
    const {msg} = alerta
  return (
    <>
    <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
    <p className="text-xl mt-5 mb-10 text-center">
          Añade tus pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>
    </p>
    <form
        /*Cuando se achica pues se le da un espacio arriba y abajo
        mb - 10 es para que no este pegado a abajo
        */
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
    >
        <div className="mb-5">
            {/*Esto es para que cuando le doy a Nombre Mascota se active el input, ESE HTMLFOR es para el id*/}
            <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
            <input
                id="nombre"
                type="text"
                placeholder="Nombre de la Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {nombre}
                onChange={e => setNombre(e.target.value)}

            >
            </input>
        </div>

        <div className="mb-5">
            {/*Esto es para que cuando le doy a Nombre Mascota se active el input, ESE HTMLFOR es para el id*/}
            <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
            <input
                id="propietario"
                type="text"
                placeholder="Nombre del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {propietario}
                onChange={e => setPropietario(e.target.value)}
            >
            </input>
        </div>

        <div className="mb-5">
            {/*Esto es para que cuando le doy a Nombre Mascota se active el input, ESE HTMLFOR es para el id*/}
            <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email Propietario</label>
            <input
                id="email"
                type="email"
                placeholder="Email del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {email}
                onChange={e => setEmail(e.target.value)}
            >
            </input>
        </div>

        <div className="mb-5">
            {/*Esto es para que cuando le doy a Nombre Mascota se active el input, ESE HTMLFOR es para el id*/}
            <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha alta</label>
            <input
                id="fecha"
                type="date"
                placeholder="Email del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {fecha}
                onChange={e => setFecha(e.target.value)}
            >
            </input>
        </div>

        <div className="mb-5">
            {/*Esto es para que cuando le doy a Nombre Mascota se active el input, ESE HTMLFOR es para el id*/}
            <label htmlFor="sintomas" 
                   className="text-gray-700 uppercase font-bold"
            >Síntomas</label>
            <textarea
                id="sintomas"
                placeholder="Describe los sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {sintomas}
                onChange={e => setSintomas(e.target.value)}
    
            >
            </textarea>
        </div>

        <input
            /*El hover es para que cambie de color */
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700
             cursor-pointer transition-colors"
            value="Agregar Paciente"
        />
            

    </form>
    {msg && <Alerta alerta = {alerta}/>}{/*Para mostrar en el formulario el error */}
    </>
    
  )
}

export default Formulario

/*Esto es */