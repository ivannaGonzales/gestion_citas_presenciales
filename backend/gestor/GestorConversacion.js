/**
 * Servicio encargado de gestionar la conversación asociada a una incidencia.
 */
class GestorConversacion {
    /**
     * Crea un gestor de conversación.
     * @param {Object} params Dependencias del gestor.
     */
    constructor({ mensajeService, fechaParseadaService }) {
        this.mensajeService = mensajeService;
        this.fechaParseadaService = fechaParseadaService;
    }

    /**
     * Guarda un mensaje enviado por el usuario y extrae una fecha desde su contenido
     * @param {string} incidenciaId Identificador de la incidencia.
     * @param {string} respuestaUsuario Texto enviado por el usuario.
     * @returns {Promise<*>} Mensaje creado.
     */
    async guardarMensaje(incidenciaId, respuestaUsuario) {
        const fechaParseada = await this.fechaParseadaService.crearFecha(respuestaUsuario);

        return this.mensajeService.crearMensaje({
            contenido: respuestaUsuario,
            incidencia: incidenciaId,
            fecha_parseada: fechaParseada ? {
                fecha: fechaParseada.fecha,
                tipo: fechaParseada.tipo
            } : null
        });
    }

    /**
     * Obtiene la conversación asociada a una incidencia y la devuelve en texto plano.
     * @param {Object} incidencia Incidencia de dominio.
     * @returns {Promise<string>} Conversación del usuario.
     */
    async obtenerConversacion(incidencia) {
        const mensajes = await this.mensajeService.obtenerMensajesPorIncidencia(incidencia.getId());
        return this.#formatearConversacion(mensajes);
    }

    /**
     * Formatea una lista de mensajes concatenando su contenido en un único texto.
     * @param {Array<Object>} mensajes Lista de mensajes asociados a la incidencia.
     * @returns {string} Conversación concatenada.
     */
    #formatearConversacion(mensajes) {
        const mensajesFormato = mensajes
            .map((mensaje) => mensaje.contenido.trim())
            .join(" ");

        return mensajesFormato;
    }
}

export { GestorConversacion };
