
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { coordinadorCita, whatsappConfig } from "../infrastructure/WhatsAppApplication.js";
import { getTextUser } from '../utilities/util.js';

dotenv.config();

function obtenerContactoWhatsApp(body) {
    const contacto =
        body?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0] ?? null;

    return contacto;
}


function obtenerTelefonoWhatsApp(body) {
    const telefono = obtenerContactoWhatsApp(body)?.wa_id ?? null;

    return telefono;
}

const enviarMensaje = async (req, res) => {
    try {
        await coordinadorCita.enviarMensaje();
        return res.status(200).json({ success: true, message: 'Mensaje enviado' });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al enviar mensaje',
            error: error.message
        });
    }
};

const configurarTokenWhatsApp = async (req, res) => {
    try {
        const { 'hub.verify_token': verifyToken, 'hub.challenge': challenge } = req.query;

        if (!verifyToken || !challenge) {
            return res.status(400).json({
                success: false,
                message: 'Faltan parámetros requeridos'
            });
        }

        if (verifyToken !== whatsappConfig.verifyToken) {
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
        const datosMensaje = await getTextUser(body);
        const mensajeUsuario = datosMensaje?.texto ?? null;
        const telefono = datosMensaje?.telefono ?? null;
        const tipoMensaje = datosMensaje?.tipo ?? null;

        if (!telefono) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido obtener el telefono del remitente'
            });
        }
        await coordinadorCita.procesarMensaje(telefono, mensajeUsuario, tipoMensaje);

        return res.status(200).json({ success: true, message: 'EVENT_RECEIVED' });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

const politicas = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '..', 'public', 'politicas.html'));
};

export { configurarTokenWhatsApp, enviarMensaje, politicas, receiveMessage };
