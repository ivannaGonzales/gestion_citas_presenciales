

import moment from "moment-timezone";
import { FacebookClient } from "../cliente/FacebookClient.js";
/**
 * Clase que se encarga de gestionar Mensajes
 * @class
 */
class GestorMensajes {

    /**
     * Constructor de la clase GestorMensajes
     * @constructor
     */
    constructor() {
        /**
         * Cliente de Api de WhatsApp Business
         * 
         * @type {FacebookClient}
         */
        this.facebookClient = new FacebookClient();
    }

    /**
     * Formatea una fecha en dos partes: fecha (`YYYY-MM-DD`) y hora (`HH:mm`).
     * @param {String} fecha Fecha en formato ISO
     * @returns {{fechaFormat: String, horaFormat: String}} Objeto con la fecha y hora formateadas.
     */
    formatearFecha(fecha) {
        const f = moment(fecha);
        return {
            fechaFormat: f.format("YYYY-MM-DD"),
            horaFormat: f.format("HH:mm")
        };
    }

    /**
     * Envía un mensaje de confirmación de cita al cliente a través de WhatsApp.
     * Utiliza una plantilla llamada cita_presencial_registrada con los parámetros de fecha y hora.
     * @param {Number} telefono Número del teléfono del cliente
     * @param {String} fecha Fecha de la cita presencial
     */
    async enviarConfirmacionCita(telefono, fecha) {
        const { fecha: f, hora: h } = this.formatearFecha(fecha);

        const mensaje = {
            "messaging_product": "whatsapp",
            "to": telefono,
            "type": "template",
            "template": {
                "name": "cita_presencial_registrada",
                "language": {
                    "code": "es"
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            {
                                "parameter_name": "fecha",
                                "type": "text",
                                "text": f
                            },
                            {
                                "parameter_name": "hora",
                                "type": "text",
                                "text": h
                            }
                        ]
                    }
                ]
            }
        }

        await this.facebookClient.llamadaServicio(mensaje)

    }

    /**
     * Envía una propuesta de cita presencial al cliente con los datos de la incidencia.
     * @param {Inicidencia} incidencia Incidencia abierta
     * @param {String} fecha Fecha propuesta para la gestión de citas presenciales
     */
    async enviarCitaPresencial(incidencia, fecha) {
        const { fechaFormat: fechaFormat, horaFormat: horaFormat } = this.formatearFecha(fecha);
        const mensaje = {
            "messaging_product": "whatsapp",
            "to": incidencia.numero,//aqui hay que tener cuidado porque le estoy pasando un número fijo 
            "type": "template",
            "template": {
                "name": "gestion_citas_presenciales",
                "language": {
                    "code": "es"
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            {
                                "parameter_name": "nombre",
                                "type": "text",
                                "text": incidencia.nombre
                            },
                            {
                                "parameter_name": "motivo",
                                "type": "text",
                                "text": incidencia.motivo
                            },
                            {
                                "parameter_name": "fecha",
                                "type": "text",
                                "text": fechaFormat
                            },
                            {
                                "parameter_name": "hora",
                                "type": "text",
                                "text": horaFormat
                            }
                        ]
                    }
                ]
            }
        }
        await this.facebookClient.llamadaServicio(mensaje)
    }
}


export { GestorMensajes };
