/**
 * Servicio encargado de gestionar las operaciones relacionadas con la entidad Mensaje
 */
export class MensajeService {
    /**
     * Crea un servicio de mensajes.
     * @param {Object} mensajeRepository Repositorio de mensajes.
     */
    constructor(mensajeRepository) {
        this.mensajeRepository = mensajeRepository;
    }

    /**
     * Crea un mensaje nuevo.
     * @param {*} data Datos del mensaje.
     * @returns {Promise<*>}
     */
    async crearMensaje(data) {
        return this.mensajeRepository.create(data);
    }

    /**
     * Obtiene todos los mensajes asociados a una incidencia.
     * @param {string|ObjectId} incidenciaId Identificador de la incidencia.
     * @returns {Promise<Array<*>>}
     */
    async obtenerMensajesPorIncidencia(incidenciaId) {
        return this.mensajeRepository.findByIncidencia(incidenciaId)
            .sort({ createdAt: 1 });
    }

    /**
     * Actualiza un mensaje por su identificador.
     * @param {string|ObjectId} id Identificador del mensaje.
     * @param {*} data Datos a actualizar.
     * @returns {Promise<*>}
     */
    async actualizar(id, data) {
        return this.mensajeRepository.update(id, data);
    }
}
