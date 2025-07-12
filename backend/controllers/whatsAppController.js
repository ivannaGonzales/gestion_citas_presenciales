
import path from "path";
import { fileURLToPath } from 'url';
import { respuestaChatGPT } from "../cliente/IAClient.js";
import { Constantes } from '../constantes/Constantes.js';
import { GestorFechasCitas } from "../gestor/GestorFechasCitas.js";
import { GestorMensajes } from "../gestor/GestorMensaje.js";
import { IncidenciaService } from "../services/InicidenciaService.js"; // cambiar por obtenerMotivoCita
import { MensajeService } from '../services/MensajeService.js';
import { getTextUser } from '../utilities/util.js';


const gestorFechasCitas = new GestorFechasCitas();
const mensajeService = new MensajeService();
const incidenciaService = new IncidenciaService();
const gestorMensajes = new GestorMensajes();


const enviarMensaje = async (req, res) => {
    try {

        const incidenciaAbierta = await incidenciaService.obtenerIncidencia();
        const fechaCitaInicial = await gestorFechasCitas.obtenerFechaCitaInicial();
        await gestorMensajes.enviarCitaPresencial(incidenciaAbierta, fechaCitaInicial)
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
        const respuesta = await getTextUser(body);
        const { wa_id: telefono, profile: { name: usuario } } = body.entry[0].changes[0].value.contacts[0];
        const motivo = await incidenciaService.obtenerMotivoCita(usuario, telefono);
        let fecha = null;
        if (respuesta === Constantes.RESPUESTA_AFIRMATIVA) {
            fecha = gestorFechasCitas.obtenerFechaCitaInicial();
            if (fecha) {
                await incidenciaService.actualizarCita(usuario, telefono, fecha);
                await gestorMensajes.enviarConfirmacionCita(telefono, fecha)
            }
        } else {
            await mensajeService.guardarMensaje(respuesta, telefono);
            fecha = await gestorFechasCitas.obtenerFechaCita(respuesta, telefono);
            if (fecha) {
                await incidenciaService.actualizarCita(usuario, telefono, fecha);
                const mensajes = await mensajeService.obtenerContenidosMensajes(telefono);
                await respuestaChatGPT(mensajes, telefono, motivo);
            }
        }

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
