import moment from "moment-timezone";
import { ParserClient } from "../cliente/ParserClient.js";
import { Constantes } from '../constantes/Constantes.js';
import { FechaParseadaService } from "../services/FechaParseadaService.js";
import { IncidenciaService } from "../services/InicidenciaService.js";
import { MensajeService } from "../services/MensajeService.js";

/**
 * Clase que se encarga de gestionar citas presenciales
 */
class GestorFechas {

    /**
     * Constructor de la clase GestorFechasCitas
     * @constructor
     */
    constructor() {
        /** 
         * Cliente Duckling
         * @type{ParserClient}
         */
        this.parserClient = new ParserClient();

        /**
         * Servicio para el modelo de FechaParseada
         */
        this.FechaParseadaService = new FechaParseadaService();
    }


    /**
     * Obtiene la proxima fecha disponible
     * @returns fecha para la cita
     */
    async obtenerPrimeraFechaDisponible() {
        const hoy = moment.utc().startOf(Constantes.DAY); // usamos utc desde el inicio
        const horaInicio = 8;
        const horaFin = 20;
        const maxDias = 30;

        //primera fechaSugerida a las 3 de la tarde
        let fechaSugerida = moment(hoy).hour(15).minute(0).second(0).millisecond(0); // objeto moment
        for (let i = 0; i < maxDias; i++) {
            const existe = await IncidenciaService.buscarPorFecha(fechaSugerida)
            if (!existe) {
                return fechaSugerida.utcOffset(0).format(Constantes.FORMATO_FECHA);
            }
            fechaSugerida.add(1, Constantes.HOUR);

            if (fechaSugerida.hour() >= horaFin) {
                fechaSugerida = moment(fechaSugerida).add(1, Constantes.DAY).hour(horaInicio).minute(0);
            }

        }

        //validación al final del ciclo
        throw new Error(`No se encontró una fecha disponible después de ${maxDias} días`);
    };

    /**
     * Analiza la respuesta estructurada del cliente de análisis semántico (como Duckling) para extraer una fecha y su granularidad.
     * @param {Array<Object>}  data Arreglo de objetos devueltos por el cliente de análisis semántico (Duckling).
     * @returns {fecha, tipo} Fecha en formato ISO 8601 y el tipo {day, hour, minute}
     */
    async analizarRespuesta(data) {
        // Asegurar que data es un array y tiene al menos dos elementos
        if (data != null) {
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
        } else {
            return null;
        }

    };
    /**
     * Analiza una respuesta textual del cliente para extraer una fecha utilizando el cliente de procesamiento de lenguaje natural.
     * @param {String} respuesta del cliente
     * @returns {String} fecha con formato para guardarlo en bbdd
     */
    async parsearFecha(respuesta) {
        const data = await this.parserClient.parsearFecha(respuesta);
        return this.analizarRespuesta(data);

    };

    /**
     * Obtiene una fecha completa para una cita a partir de los mensajes previamente enviados por un cliente.
     * @param {Number} telefono Teléfono del cliente
     * @returns {Fecha} fecha Fecha en formato ISO8601
     */
    async obtenerFecha(telefono) {
        //obtengo las fechas si hay mensajes
        const mensajes = (await MensajeService.obtenerMensajes(telefono))
        if (mensajes != null) {
            for (let i = 0; i < mensajes.length; i++) {
                const actual = mensajes[i];
                const fechaActual = actual.fechaParseada;
                // Si es una fecha base tipo 'day' o 'week'
                if (fechaActual?.tipo === Constantes.DAY) {
                    const baseDate = moment.parseZone(fechaActual.fecha).format("YYYY-MM-DD");

                    // Buscar hacia adelante un complemento tipo 'hour' o 'minute'
                    for (let j = i + 1; j < mensajes.length; j++) {
                        const siguiente = mensajes[j].fechaParseada;
                        if (siguiente?.tipo === Constantes.HOUR || siguiente?.tipo === Constantes.MINUTE) {
                            const hourPart = moment.parseZone(siguiente.fecha).utcOffset(0, true).format("HH:mm:ss.SSSZ");
                            const fechaUnificada = `${baseDate}T${hourPart}`;
                            return fechaUnificada;
                        }
                    }
                } else {
                    return moment.parseZone(fechaActual.fecha).utcOffset(0, true).format(Constantes.FORMATO_FECHA);
                }
            }
        }
        else {
            return null;
        }
    }

    /**
     * Analiza el mensaje del cliente que contiene una posible fecha para una cita
     * @param {String} respuesta 
     * @param {Number} telefono
     */
    async analizarMensaje(respuesta, telefono) {
        //obtiene el martes 13 
        const mensaje = await MensajeService.buscarPorContenidoYTelefono(respuesta, telefono)
        if (!mensaje) {
            console.log("No se encontró ningún mensaje con esos datos.");
            return;
        }
        const resultado = await this.parsearFecha(respuesta); // { fecha, tipo }
        this.FechaParseadaService.crearFechaParseada(resultado.fecha, resultado.tipo)


        mensaje.fechaParseada = nuevaFecha._id;
        await mensaje.save();
    };

    /**
     * Obtiene la cita propuesta por el cliente
     * @param {String} respuesta Respuesta del cliente
     * @param {Number} telefono Teléfono del cliente
     * @returns Fecha de la cita
     */
    async obtenerFechaCita(respuesta, telefono) {
        let fecha = null;
        try {
            await this.analizarMensaje(respuesta, telefono);
            fecha = await this.obtenerFecha(telefono);
        } catch (error) {
        }
        return fecha;
    };
}

export { GestorFechas };
