/**
 * Clase que se encarga de gestionar citas presenciales
 * 
 * @class
 */
class CoordinadorCita {

    /**
     * Crea el coordinador de citas.
     * @param {Object} params Dependencias del coordinador.
     */
    constructor({
        iniciarConversacionCita,
        procesarRespuestaCita
    }) {
        this.iniciarConversacionCita = iniciarConversacionCita;
        this.procesarRespuestaCita = procesarRespuestaCita;
    }
    /**
     * Envía una propuesta de cita presencial al cliente.
     * @returns {Promise<void>}
     */
    async enviarMensaje() {
        await this.iniciarConversacionCita.ejecutar();
    }

    /**
     * Procesa la respuesta del cliente y gestiona la lógica de agendamiento o actualización de una cita.
     * @param {string} telefono Numero del cliente.
     * @param {string} respuestaUsuario Respuesta del cliente.
     * @param {string} tipoMensaje Tipo de mensaje recibido.
     * @returns {Promise<void>}
     */
    async procesarMensaje(telefono, respuestaUsuario, tipoMensaje) {
        return this.procesarRespuestaCita.ejecutar({ telefono, respuestaUsuario, tipoMensaje });
    }
}

export { CoordinadorCita };
