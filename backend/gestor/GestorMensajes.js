
import moment from "moment-timezone";

class GestorMensajes {
    /**
     * Crea un gestor de mensajes.
     * @param {Object} params Dependencias del gestor.
     */
    constructor({ facebookClient, usuarioService }) {
        this.facebookClient = facebookClient;
        this.usuarioService = usuarioService;
    }

    /**
     * Convierte una fecha a formato legible para las plantillas.
     * @param {Date|string} fecha Fecha a formatear.
     * @returns {{fecha: string, hora: string}}
     */
    formatearFecha(fecha) {
        const fechaMoment = moment.utc(fecha);
        return {
            fecha: fechaMoment.format("YYYY-MM-DD"),
            hora: fechaMoment.format("HH:mm")
        };
    }

    /**
     * Construye la estructura de un mensaje plantilla de WhatsApp.
     * @param {Object} params Parámetros de la plantilla.
     * @returns {Object} Payload listo para enviar.
     */
    construirMensajeTemplate({ telefono, template, parametros }) {
        return {
            "messaging_product": "whatsapp",
            "to": telefono,
            "type": "template",
            "template": {
                "name": template,
                "language": {
                    "code": "es"
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": parametros
                    }
                ]
            }
        };
    }

    /**
     * Obtiene el teléfono de una incidencia.
     * @param {Object} incidencia Incidencia de dominio.
     * @returns {string}
     */
    obtenerTelefonoIncidencia(incidencia) {
        const telefono = incidencia?.telefonoContacto
            ? String(incidencia.telefonoContacto)
            : null;

        if (!telefono) {
            throw new Error("No se encontro un telefono de contacto para la incidencia");
        }

        return telefono;
    }

    /**
     * Obtiene el nombre del cliente asociado a una incidencia.
     * @param {Object} incidencia Incidencia de dominio.
     * @returns {Promise<string>}
     */
    async obtenerNombreCliente(incidencia) {
        const telefono = this.obtenerTelefonoIncidencia(incidencia);
        const usuario = await this.usuarioService.obtenerUsuarioPorTelefono(telefono);

        return usuario?.nombre || incidencia?.nombreCliente || "cliente";
    }

    /**
     * Envía una plantilla de WhatsApp.
     * @param {Object} params Parámetros de la plantilla.
     * @returns {Promise<void>}
     */
    async enviarTemplate({ telefono, template, parametros }) {
        const mensaje = this.construirMensajeTemplate({ telefono, template, parametros });
        await this.facebookClient.enviarMensaje(mensaje);
    }

    /**
     * Envía un mensaje de texto.
     * @param {string} telefono Teléfono de destino.
     * @param {string} contenido Contenido del mensaje.
     * @returns {Promise<void>}
     */
    async enviarTexto(telefono, contenido) {
        const mensaje = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": telefono,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": contenido
            }
        };

        await this.facebookClient.enviarMensaje(mensaje);
    }

    /**
     * Envía la confirmación de la cita registrada.
     * @param {string} telefono Teléfono de destino.
     * @param {Date|string} fecha Fecha de la cita.
     * @returns {Promise<void>}
     */
    async enviarConfirmacionCita(telefono, fecha) {
        const { fecha: fechaFormateada, hora } = this.formatearFecha(fecha);
        await this.enviarTemplate({
            telefono,
            template: "cita_presencial_registrada",
            parametros: [
                {
                    "parameter_name": "fecha",
                    "type": "text",
                    "text": fechaFormateada
                },
                {
                    "parameter_name": "hora",
                    "type": "text",
                    "text": hora
                }
            ]
        });
    }

    /**
     * Informa de que una fecha no está disponible.
     * @param {string} telefono Teléfono de destino.
     * @param {Date|string} fecha Fecha solicitada.
     * @returns {Promise<void>}
     */
    async enviarFechaNoDisponible(telefono, fecha) {
        const { fecha: fechaFormateada, hora } = this.formatearFecha(fecha);
        await this.enviarTexto(
            telefono,
            `Lo siento, la fecha ${fechaFormateada} a las ${hora} ya esta asignada a otra cita. Por favor, indiqueme otra fecha y hora.`
        );
    }

    /**
     * Envía la propuesta de cita presencial al cliente.
     * @param {Object} incidencia Incidencia de dominio.
     * @param {Date|string} fecha Fecha propuesta.
     * @returns {Promise<void>}
     */
    async enviarCitaPresencial(incidencia, fecha) {
        const { fecha: fechaFormateada, hora } = this.formatearFecha(fecha);
        const nombreCliente = await this.obtenerNombreCliente(incidencia);

        await this.enviarTemplate({
            telefono: this.obtenerTelefonoIncidencia(incidencia),
            template: "gestion_citas_presenciales",
            parametros: [
                {
                    "parameter_name": "nombre",
                    "type": "text",
                    "text": nombreCliente
                },
                {
                    "parameter_name": "motivo",
                    "type": "text",
                    "text": incidencia.motivo
                },
                {
                    "parameter_name": "fecha",
                    "type": "text",
                    "text": fechaFormateada
                },
                {
                    "parameter_name": "hora",
                    "type": "text",
                    "text": hora
                }
            ]
        });
    }

    /**
     * Envía una respuesta generada por IA.
     * @param {string} telefono Teléfono de destino.
     * @param {string} respuestaChatGPT Texto generado por IA.
     * @returns {Promise<void>}
     */
    async enviarRespuestaIA(telefono, respuestaChatGPT) {
        await this.enviarTexto(telefono, respuestaChatGPT);
    }
}

export { GestorMensajes };
