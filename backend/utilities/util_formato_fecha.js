import axios from 'axios';
import moment from "moment-timezone";

/*
* Se encarga de obtener la primera fecha
* que se ofrecerá al cliente
* por defecto: Siguiente día del día actual
* OJO que aquí tengo que ver si es el día viernes tiene que devolver el lunes
 */
function obtenerFechaCitaInicial() {
    // Obtener la fecha actual
    const fechaHoy = moment();

    // Calcular el día siguiente
    const diaSiguiente = fechaHoy.add(1, "days");

    // Verificar si el día siguiente es viernes, sábado o domingo
    if (diaSiguiente.day() === 5) { // Viernes
        diaSiguiente.add(3, "days"); // Mover al lunes
    } else if (diaSiguiente.day() === 6) { // Sábado
        diaSiguiente.add(2, "days"); // Mover al lunes
    } else if (diaSiguiente.day() === 0) { // Domingo
        diaSiguiente.add(1, "days"); // Mover al lunes
    }

    // Retornar un objeto con la fecha y hora
    return {
        fecha: diaSiguiente.format("YYYY-MM-DD"),
        hora: '17:00'
    };
}

const datos = {}
const unirDiaHora = async (dia, hora) => {

    const fechaSolo = dia.split('T')[0];
    const horaCompleta = hora.split('T')[1];
    return `${fechaSolo}T${horaCompleta}`;

}
const analizarRespuesta = async (data) => {
    // Asegurar que data es un array y tiene al menos dos elementos
    let fecha = null; //la fecha
    let tipo = null; // hour, minute, day
    let primeraFecha = null;

    console.log('estoy dentro de analizarRespuesta')

    //me recorro para casos del tipo "el 7 de mayo quiero una cita"
    data.forEach(item => {
        if (item.value.values) {
            primeraFecha = item.value.values[0];
            fecha = primeraFecha.value;
            tipo = primeraFecha.grain;
        }

    });

    if (tipo == 'day') {
        //solo me dan el día
        //por ejemplo: el 7 de mayo quiero una cita"
        datos.dia = fecha

    } else if (tipo == 'minute') {
        //por ejemplo: Necesito una cita el 12 de junio a las 10:00 AM
        datos.diaExacto = fecha
    } else if (tipo == 'hour') {
        //por ejemplo: a las 3 de la tarde
        datos.hora = fecha
    }
    //

    if (datos.diaExacto != null) {
        fecha = datos.diaExacto
        console.log('fecha primera ', fecha)
        fecha = moment.parseZone(fecha).utcOffset(0, true).format("YYYY-MM-DDTHH:mm:ss.SSSZ").replace("Z", "+00:00")
    } else if (datos.dia != null && datos.hora != null) {
        fecha = `${datos.dia.split("T")[0]}T${datos.hora.split("T")[1]}`;
        fecha = moment.parseZone(fecha).utcOffset(0, true).format("YYYY-MM-DDTHH:mm:ss.SSSZ").replace("Z", "+00:00")
    }
    console.log('fecha ', fecha)
    return fecha

};
const obtenerFechaCita = async (texto) => {
    try {
        // Construir el cuerpo en formato x-www-form-urlencoded
        const body = new URLSearchParams();
        body.append('text', texto);
        body.append('lang', 'es');

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await axios.post('https://appgestioncitas.azurewebsites.net/parse', body.toString(), { headers });

        return await analizarRespuesta(response.data)

    } catch (error) {
        return res.status(500).json({
            success: false,

            message: error.message
        });
    }
};
export { analizarRespuesta, obtenerFechaCita, obtenerFechaCitaInicial };



