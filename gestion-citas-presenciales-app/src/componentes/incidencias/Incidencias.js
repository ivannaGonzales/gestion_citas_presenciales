
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Incidencia from './Incidencia';
//importar cliente axios
function Incidencias() {

    //trabajar con el state
    //incidencias = state
    // savaIncidencias = funcion para guardar el state
    // lo guardamos en el state
    const [incidencias, saveIncidencias] = useState([]);//valor inicial

    const consultarAPI = async () => {
        const getIncidencias = await clienteAxios.get('incidencias/empresa/Movistar');
        //colocar el resultado en el state
        saveIncidencias(getIncidencias.data);

    }

    //se carga automaticamente
    useEffect(() => {
        consultarAPI();
    }, [])
    return (
        < Fragment >
            <h2>Incidencias</h2>

            <Link to={"/incidencias/nuevo"} class="btn btn-verde nvo-cliente"> <i class="fas fa-plus-circle"></i>
                Nuevo Incidencia
            </Link>


            <ul className='listado-incidencias'>
                {incidencias.map(incidencia =>
                    <Incidencia
                        key={incidencia._id}
                        incidencia={incidencia}
                    />
                )}
            </ul>
        </Fragment >

    )
}
export default Incidencias;