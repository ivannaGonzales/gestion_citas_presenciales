import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/axios'

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {
    /*Coger los datos del paciente y cogerlos en el state */
    const [pacientes, setPacientes] = useState([])

    /*Va a ejecutarse una sola vez */

    useEffect(() => {
        const obtenerPacientes = async () => {
            try{
                const token = localStorage.getItem('token')
                if(!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/pacientes', config)
                console.log(data)


            }catch(error){
                console.log('Obtener pacientes')
            }
        }
        obtenerPacientes()

    }, [])
    const guardarPaciente = async (paciente) => {
        /*Se va a guardar aqui el paciente */
        try{
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/pacientes', paciente, config)/*colocarlo en el state */
            const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
            console.log(pacienteAlmacenado)
            setPacientes([pacienteAlmacenado, ... pacientes])/*Mostrara primero el paciente, se añadirá primero */
        }catch(error){
            console.log(error.response.data.msg)
        }
    }
    return (
    
    <PacientesContext.Provider
        value = {{
            pacientes,
            guardarPaciente
        }}
    >
        {children}

    </PacientesContext.Provider>
    
    )

}

export default PacientesContext