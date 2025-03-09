
import path from "path";
import { fileURLToPath } from 'url';
import Incidencia from "../models/Incidencia.js";
import { getTextUser } from '../utilities/util.js';
import { generarRespuestaChatGPT, llamadaServicio } from '../utilities/util_configuracion_whatsApp.js';

const enviarMensaje = async (req, res) => {
    try {
        // Obtener la incidencia abierta
        const incidenciaAbierta = await Incidencia.findOne({ resuelta: false });
        // Verificar si existe la incidencia
        if (!incidenciaAbierta) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró ninguna incidencia abierta'
            });
        }

        await enviarCitaPresencialWhatsApp(incidenciaAbierta);

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
        const telefono = body.entry[0].changes[0].value.messages[0].from

        if (respuesta == "Si") {

            await enviarConfirmacionCitaWhatsApp();

        } else {
            await respuestaChatGPTWhatsApp(respuesta, telefono)

        }

        return res.status(200).json({
            success: true,
            message: 'EVENT_RECEIVED'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

const respuestaChatGPTWhatsApp = async (respuesta, telefono) => {

    const responseChatGPT = await generarRespuestaChatGPT();

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

}
const enviarConfirmacionCitaWhatsApp = async () => {
    //const token = process.env.TOKEN_CHA
    const mensaje = {
        "messaging_product": "whatsapp",
        "to": "625958554",
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
                            "text": "03/05/2025"
                        }
                    ]
                }
            ]
        }
    }

    await llamadaServicio(mensaje)
}
const enviarCitaPresencialWhatsApp = async (incidencia) => {

    const mensaje = {
        "messaging_product": "whatsapp",
        "to": "625958554",
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
                            "text": "2025-03-01"
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

