
import path from "path";
import { fileURLToPath } from 'url';
import { CoordinadorCita } from "../coordinador/CoordinadorCita.js";
import { getTextUser } from '../utilities/util.js';
const coordinadorCita = new CoordinadorCita();


const enviarMensaje = async (req, res) => {
    try {

        coordinadorCita.enviarMensaje();

        return res.status(200).json({
            success: true,
            message: 'Mensaje enviado exitosamente comida griega'
        });

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
        const respuesta = await getTextUser(body);
        const { wa_id: telefono, profile: { name: usuario } } = body.entry[0].changes[0].value.contacts[0];

        // coordinadorCita(usuario, telefono, respuesta)
        coordinadorCita.procesarMensaje(usuario, telefono, respuesta);

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
}
export { configurarTokenWhatsApp, enviarMensaje, politicas, receiveMessage };
