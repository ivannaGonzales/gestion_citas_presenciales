
import { useEffect } from 'react';
import clienteAxios from '../../config/axios';
//importar cliente axios
function Incidencias() {

    //query a la API

    const consultarAPI = async () => {
        console.log('Consultando ...')
        const getIncidencias = await clienteAxios.get('incidencias/empresa/Movistar');

        console.log(getIncidencias)
    }

    //se carga automaticamente
    useEffect(() => {
        consultarAPI();
    })
    return (
        <h2>Incidencias</h2>
    )
}
export default Incidencias;