
import path from "path";
import { fileURLToPath } from 'url';
import Incidencia from "../models/Incidencia.js";
import { getTextUser } from '../utilities/util.js';
import { generarRespuestaChatGPT, llamadaServicio } from '../utilities/util_configuracion_whatsApp.js';
import { convertirAISO8601, obtenerFechaCitaInicial } from '../utilities/util_formato_fecha.js';

const enviarMensaje = async (req, res) => {
    try {

        const incidenciaAbierta = await Incidencia.findOne({ resuelta: false });
        // Verificar si existe la incidencia
        if (!incidenciaAbierta) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró ninguna incidencia abierta'
            });
        }

        const fechaCitaInicial = obtenerFechaCitaInicial();
        await enviarCitaPresencialWhatsApp(incidenciaAbierta, fechaCitaInicial.fecha, fechaCitaInicial.hora);

        return res.status(200).json({
            success: true,
            message: 'Mensaje enviado exitosamente'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};
const configurarTokenWhatsApp = async (req, res) => {
    try {
        // Definir constantes
        const access_token = 'access_token';

        // Desestructurar los parámetros de consulta
        const { 'hub.verify_token': verifyToken, 'hub.challenge': challenge } = req.query;

        // Verificar que tenemos todos los parámetros necesarios
        if (!verifyToken || !challenge) {
            return res.status(400).json({
                success: false,
                message: 'Faltan parámetros requeridos'
            });
        }

        // Verificar el token
        if (verifyToken !== access_token) {
            return res.status(400).json({
                success: false,
                message: 'Token no válido'
            });
        }
        return res.json(Number(challenge));

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};


const receiveMessage = async (req, res) => {

    try {
        const body = req.body;
        const respuesta = await getTextUser(body)
        const telefono = body.entry[0].changes[0].value.contacts[0].wa_id
        const usuario = body.entry[0].changes[0].value.contacts[0].profile.name
        let respuestaChatGPT;

        const motivo = await Incidencia.findOne({
            $and: [
                { nombre: usuario },
                { numero: telefono }
            ]
        }, {
            _id: 0,
            motivo: 1
        })
        if (respuesta == "Si") {
            const fechaCitaInicial = obtenerFechaCitaInicial();
            await enviarConfirmacionCitaWhatsApp(telefono, fechaCitaInicial.fecha, fechaCitaInicial.hora);
        } else {
            respuestaChatGPT = await respuestaChatGPTWhatsApp(respuesta, telefono, motivo.motivo)
        }

        try {
            const fecha = convertirAISO8601(respuestaChatGPT, 'Central European Time');
            //modificar la fecha
            await Incidencia.findOneAndUpdate(
                { nombre: usuario, numero: telefono }, // Criterios de búsqueda
                {
                    fecha: fecha,
                    resuelta: true
                }, // Actualización
                { new: true } // Retorna el documento actualizado
            );

        } catch (error) {
            console.log('error ', error)
        }

        return res.status(200).json({
            success: true,
            message: 'EVENT_RECEIVED ' || fecha
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

const respuestaChatGPTWhatsApp = async (respuesta, telefono, motivo) => {

    const responseChatGPT = await generarRespuestaChatGPT(respuesta, motivo);

    const mensaje = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": telefono,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": responseChatGPT
        }
    }
    await llamadaServicio(mensaje)

    return responseChatGPT
}
const enviarConfirmacionCitaWhatsApp = async (telefono, fecha, hora) => {
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
                            "text": fecha
                        },
                        {
                            "parameter_name": "hora",
                            "type": "text",
                            "text": hora
                        }
                    ]
                }
            ]
        }
    }

    await llamadaServicio(mensaje)
}
const enviarCitaPresencialWhatsApp = async (incidencia, fecha, hora) => {

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
                            "text": fecha
                        },
                        {
                            "parameter_name": "hora",
                            "type": "text",
                            "text": hora
                        }
                    ]
                }
            ]
        }
    }
    await llamadaServicio(mensaje)
}

const politicas = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '..', 'public', 'politicas.html'));
}
export { configurarTokenWhatsApp, enviarCitaPresencialWhatsApp, enviarConfirmacionCitaWhatsApp, enviarMensaje, politicas, receiveMessage };

