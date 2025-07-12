

import moment from "moment-timezone";
import { llamadaServicio } from "../cliente/FacebookClient.js";

class GestorMensajes {

    constructor() {

    }

    formatearFecha(fecha) {
        const f = moment(fecha);
        return {
            fechaFormat: f.format("YYYY-MM-DD"),
            horaFormat: f.format("HH:mm")
        };
    }

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

        await llamadaServicio(mensaje)

    }

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
        await llamadaServicio(mensaje)
    }
}


export { GestorMensajes };
