import { OperacionCita } from "./OperacionCita.js";

export class ProcesarRespuestaCita extends OperacionCita {
    /**
     * Crea la operación de procesamiento de respuestas.
     * @param {Object} params Dependencias de la operación.
     */
    constructor({
        gestorCita
    }) {
        super({ gestorCita });
    }

    /**
     * Ejecuta el caso de uso de procesamiento de respuesta.
     * @param {Object} params Datos del mensaje.
     * @returns {Promise<void>}
     */
    async ejecutar({ telefono, respuestaUsuario, tipoMensaje }) {
        return this.gestorCita.procesarRespuesta({ telefono, respuestaUsuario, tipoMensaje });
    }
}
