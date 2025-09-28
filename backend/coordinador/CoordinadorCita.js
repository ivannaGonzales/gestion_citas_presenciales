import { IAClient } from '../cliente/IAClient.js';
import { Constantes } from '../constantes/Constantes.js';
import { GestorFechas } from "../gestor/GestorFechas.js";
import { GestorMensajes } from "../gestor/GestorMensaje.js";
import { IncidenciaService } from "../services/InicidenciaService.js"; // cambiar por obtenerMotivoCita
import { MensajeService } from '../services/MensajeService.js';

/**
 * Clase que se encarga de gestionar citas presenciales
 * 
 * @class
 */
class CoordinadorCita {

    /**
     * Constructor de la clase CoordinadorCita
     * 
     * @constructor
     */
    constructor() {
        /**
         * Cliente de Fechas
         * @type {GestorFechas}
         */
        this.gestorFechas = new GestorFechas();
        /**
         * Gestor de mensajes
         * @type {GestorMensajes}
         */
        this.gestorMensajes = new GestorMensajes();
        /**
         * Servicio del modelo Incidencia
         * @type {IncidenciaService}
         */
        this.incidenciaService = new IncidenciaService();
        /**
         * Servicio del modelo Mensaje
         * @type {MensajeService}
         */
        this.mensajeService = new MensajeService();
        /**
         * CLiente IA
         * @type {IAClient}
         */
        this.iaClient = new IAClient();
    }
    /**
     * Envía una propuesta de cita presencial al cliente.
     */
    async enviarMensaje() {

        const incidenciaAbierta = await this.incidenciaService.obtenerIncidencia();
        const fechaCitaInicial = await this.gestorFechas.buscarFechaDisponible();
        await this.gestorMensajes.enviarCitaPresencial(incidenciaAbierta, fechaCitaInicial)
    }

    /**
     * Procesa la respuesta del cliente y gestiona la lógica de agendamiento o actualización de una cita.
     * @param {String} usuario Cliente
     * @param {Number} telefono Número del cliente
     * @param {String} respuesta Respuesta del cliente
     */
    async procesarMensaje(usuario, telefono, respuesta) {
        //obtenerMotivoCita(nombre, numero)
        //aqui lanza error si no encuentra motivo
        const motivo = this.incidenciaService.obtenerMotivo(usuario, telefono);
        let fecha = null;
        if (respuesta === Constantes.RESPUESTA_AFIRMATIVA) {
            fecha = await this.gestorFechas.buscarFechaDisponible();
            if (fecha) {
                await this.incidenciaService.actualizarCita(usuario, telefono, fecha);//resulta
                await this.gestorMensajes.enviarConfirmacionCita(telefono, fecha)//envia confirmacioncita
            }
        } else {
            await this.mensajeService.guardarMensaje(respuesta, telefono);
            fecha = await this.gestorFechas.fechaCitaConversacion(respuesta, telefono);
            //IAClient
            const mensajes = await this.mensajeService.obtenerConversacion(telefono);
            this.iaClient.respuestaChatGPT(mensajes, telefono, motivo);
            if (fecha) {
                await this.incidenciaService.actualizarCita(usuario, telefono, fecha);
            }
        }
    }
}

export { CoordinadorCita };
