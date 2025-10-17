import moment from "moment-timezone";
import { ParserClient } from "../cliente/ParserClient.js";
import { Constantes } from '../constantes/Constantes.js';
import { FechaTipoHelper } from "../helpers/FechaTipoHelper.js";
import { FechaParseadaService } from "../services/FechaParseadaService.js";
import { IncidenciaService } from "../services/InicidenciaService.js";
import { MensajeService } from "../services/MensajeService.js";
import { FechaUTCUtils } from "../utilities/FechaUTCUtils.js";
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
        this.fechaParseadaService = new FechaParseadaService();

        this.incidenciaService = new IncidenciaService();
        this.mensajeService = new MensajeService();
    }


    /**
     * Obtiene la proxima fecha disponible
     * @returns fecha para la cita
     */
    async buscarFechaDisponible() {
        const hoy = moment.utc().startOf(Constantes.DAY); // inicio del día en UTC
        const siguienteHora = moment.utc().add(1, 'hour').startOf('hour'); // siguiente hora redondeada
        const horaInicio = 8;
        const horaFin = 20;
        const maxDias = 30;

        //primera fechaSugerida a las 3 de la tarde

        let fechaSugerida = moment(hoy)
            .hour(siguienteHora.hour())
            .minute(0)
            .second(0)
            .millisecond(0);


        for (let i = 0; i < maxDias; i++) {
            const existe = await this.incidenciaService.buscarPorFecha(fechaSugerida)//por q incidencia?
            if (!existe) {
                return fechaSugerida.utcOffset(0).format(Constantes.FORMATO_FECHA);
            }
            fechaSugerida.add(1, Constantes.HOUR);

            if (fechaSugerida.hour() >= horaFin) {
                fechaSugerida = moment(fechaSugerida).add(1, Constantes.DAY).hour(horaInicio).minute(0);
            }

        }
        throw new Error(`No se encontró una fecha disponible después de ${maxDias} días`);
    };


    /**
     * Obtiene la cita propuesta por el cliente
     * @param {String} respuesta Respuesta del cliente
     * @param {Number} telefono Teléfono del cliente
     * @returns Fecha de la cita
     */
    async fechaCitaConversacion(respuesta, telefono) {
        let fecha = null;
        try {
            await this.#actualizarMensajeFechaParseada(respuesta, telefono);
            fecha = await this.#obtenerFecha(telefono);
        } catch (error) {
            throw new Error("No se ha podido obtener una cita presencial dada la conversación con el cliente");
        }
        return fecha;
    };

    /**
     * Analiza el mensaje del cliente que contiene una posible fecha para una cita
     * @param {String} respuesta 
     * @param {Number} telefono
     */
    async #actualizarMensajeFechaParseada(respuesta, telefono) {
        const mensaje = await this.mensajeService.obtenerMensaje(respuesta, telefono)
        if (mensaje != null) {
            const data = await this.parserClient.parsearFecha(respuesta);
            const { fecha, tipo } = FechaTipoHelper.extraerFechaYTipo(data);
            const nuevaFecha = await this.fechaParseadaService.crearFechaParseada(fecha, tipo)
            mensaje.fechaParseada = nuevaFecha._id;
            await mensaje.save();
        }

    };
    /**
     * Obtiene una fecha completa para una cita a partir de los mensajes previamente enviados por un cliente.
     * @param {Number} telefono Teléfono del cliente
     * @returns {Fecha} fecha Fecha en formato ISO8601
     */
    async #obtenerFecha(telefono) {
        //obtengo las fechas si hay mensajes
        const mensajes = (await this.mensajeService.obtenerMensajes(telefono))
        let fechaFinal = null;

        let dia = null;
        let hora = null;

        for (let i = 0; i < mensajes.length; i++) {

            const actual = mensajes[i].fechaParseada;

            if ((actual.tipo) == Constantes.DAY) {
                dia = FechaUTCUtils.obtenerDia(actual.fecha);
            }

            else if ((actual.tipo) == Constantes.HOUR) {
                hora = FechaUTCUtils.obtenerHoraUTC(actual.fecha)
            }

            else {
                // fecha completa
                dia = FechaUTCUtils.obtenerDia(actual.fecha);
                hora = FechaUTCUtils.obtenerHoraUTC(actual.fecha);
            }
            fechaFinal = `${dia}T${hora}`;
        }

        if ((dia == null) || (hora == null)) {
            return null
        }

        else
            return fechaFinal;
    }
}

const gestor = new GestorFechas();

gestor.buscarFechaDisponible();


export { GestorFechas };
