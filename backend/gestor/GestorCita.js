
/**
 * Clase encargada de gestionar el flujo completo de una cita presencial
 * 
 * Orquesta la búsqueda de incidencias, la gestión de fechas, el guardado de
 * mensajes y el envío de respuestas al usuario.
 */
class GestorCita {
    /**
     * Crea una nueva instancia del gestor de citas.
     * @param {Object} params Dependencias del gestor.
     */
    constructor({
        incidenciaService,
        gestorFechas,
        gestorMensajes,
        gestorConversacion,
        iaClient
    }) {
        this.incidenciaService = incidenciaService;
        this.gestorFechas = gestorFechas;
        this.gestorMensajes = gestorMensajes;
        this.gestorConversacion = gestorConversacion;
        this.iaClient = iaClient;
    }

    /**
     * Inicia la conversación buscando una incidencia activa y proponiendo una fecha disponible.
     * 
     */
    async iniciarConversacion() {
        const incidencia = await this.incidenciaService.obtenerIncidenciaActiva();

        if (!incidencia) {
            throw new Error("No existe ninguna incidencia activa para iniciar la conversacion");
        }

        const fechaPropuesta = await this.gestorFechas.buscarFechaDisponible(
            (fecha) => this.incidenciaService.buscarPorFecha(fecha)
        );
        await this.gestorMensajes.enviarCitaPresencial(incidencia, fechaPropuesta);
    }

    /**
     * Procesa la respuesta del usuario durante la conversación.
     * @param {Object} params Parámetros del mensaje recibido.
     * @param {string} params.telefono Teléfono del usuario.
     * @param {string} params.respuestaUsuario Texto enviado por el usuario.
     * @param {string} params.tipoMensaje Tipo de mensaje recibido.
     * @returns {Promise<void>}
     */
    async procesarRespuesta({ telefono, respuestaUsuario, tipoMensaje }) {
        const incidencia = await this.incidenciaService.obtenerIncidenciaPorTelefono(telefono);

        if (!incidencia) {
            throw new Error(`No se encontro una incidencia asociada al telefono ${telefono}`);
        }

        await this.gestorConversacion.guardarMensaje(incidencia.getId(), respuestaUsuario);

        const fecha = await this.gestorFechas.resolverFechaConversacional(
            {
                incidenciaId: incidencia.getId(),
                respuesta: respuestaUsuario,
                tipoMensaje,
                esFechaOcupada: (fechaCita) => this.incidenciaService.buscarPorFecha(fechaCita)
            }
        );
        console.log("fecha " + fecha)

        if (fecha) {//puedo tener aqui la fecha ya se por conversacion o viene del si 
            const fechaDisponible = await this.gestorFechas.estaFechaDisponible(
                fecha,
                (fechaCita) => this.incidenciaService.buscarPorFecha(fechaCita)
            );

            if (!fechaDisponible) {
                await this.gestorMensajes.enviarFechaNoDisponible(telefono, fecha);
            } else {
                //hay una fecha disponible
                //puede ser que esto venga del Si o venga de la fecha conversacional
                await this.incidenciaService.actualizarCita(incidencia, fecha);
                this.gestorMensajes.enviarConfirmacionCita(telefono, fecha)

            }
        }
        else {
            //ewntra por aqui porque dijo que No 
            const conversacion = await this.gestorConversacion.obtenerConversacion(incidencia);
            const respuestaIA = await this.iaClient.generarRespuestaSeguimiento(
                conversacion,
                incidencia.getMotivo()
            );
            await this.gestorMensajes.enviarRespuestaIA(telefono, respuestaIA);
        }
    }
}

export { GestorCita };
