import axios from 'axios';
import moment from "moment-timezone";
import { obtenerMensajeById, obtenerMensajes } from '../utilities/util_mensaje.js';
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

const analizarRespuesta = async (data) => {
    // Asegurar que data es un array y tiene al menos dos elementos
    let fecha = null; //la fecha
    let tipo = null; // hour, minute, day
    let primeraFecha = null;
    //me recorro para casos del tipo "el 7 de mayo quiero una cita"
    data.forEach(item => {
        if (item.value.values) {
            primeraFecha = item.value.values[0];
            fecha = primeraFecha.value;
            tipo = primeraFecha.grain;
        }

    });
    return { fecha, tipo }

};
const parsearFecha = async (texto) => {
    const body = new URLSearchParams();
    body.append('text', texto);
    body.append('lang', 'es');

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await axios.post('https://appgestioncitas.azurewebsites.net/parse', body.toString(), { headers });

    return await analizarRespuesta(response.data)

}

const parsearMensajes = async (mensajesPromise) => {
    const mensajes = await mensajesPromise;
    const resultados = await Promise.all(
        mensajes.map(async mensaje => {
            const encontrado = await obtenerMensajeById({ _id: mensaje._id });
            if (encontrado) {
                return parsearFecha(encontrado.contenido);
            }
            return null;
        })
    );
    return resultados;
};


const obtenerFecha = async (fechasParseadas) => {
    //si el primero es distinto de day entonces devuelvo la fecha tal cual
    console.log('fechasParseadas ', fechasParseadas)
    const tipoPrimero = fechasParseadas[0]?.tipo; // Usa `?.` para evitar errores si el array está vacío
    console.log('tipoPrimero ', tipoPrimero)
    let fecha = null;
    if (tipoPrimero !== 'day') {
        fecha = moment.parseZone(fechasParseadas[0]?.fecha).utcOffset(0, true).format("YYYY-MM-DDTHH:mm:ss.SSSZ").replace("Z", "+00:00")
    } else {
        //
        if (fechasParseadas.length > 1) {
            const fechaBase = moment.parseZone(fechasParseadas[0]?.fecha).format("YYYY-MM-DD");
            const horaBase = moment.parseZone(fechasParseadas[1]?.fecha).format("HH:mm:ss.SSSZ");

            fecha = `${fechaBase}T${horaBase}`;

            console.log("Fecha combinada:", fecha);

            fecha = moment.parseZone(fecha).utcOffset(0, true).format("YYYY-MM-DDTHH:mm:ss.SSSZ").replace("Z", "+00:00");
        }
    }
    return fecha

}
const obtenerFechaCita = async (telefono) => {
    let fecha = null;
    try {
        const mensajes = await obtenerMensajes(telefono)
        const fechasParseadas = await parsearMensajes(mensajes)
        fecha = obtenerFecha(fechasParseadas);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    return fecha;
};
export { analizarRespuesta, obtenerFechaCita, obtenerFechaCitaInicial };





