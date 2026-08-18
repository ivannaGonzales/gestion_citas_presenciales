import { OperacionCita } from "./OperacionCita.js";

export class IniciarConversacionCita extends OperacionCita {
    /**
     * Crea la operación de inicio de conversación.
     * @param {Object} params Dependencias de la operación.
     */
    constructor({ gestorCita }) {
        super({ gestorCita });
    }

    /**
     * Ejecuta el caso de uso de inicio de conversación.
     * @returns {Promise<void>}
     */
    async ejecutar() {
        return this.gestorCita.iniciarConversacion();
    }
}
