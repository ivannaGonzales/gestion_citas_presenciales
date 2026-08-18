import axios from 'axios';
import dotenv from 'dotenv';
import { ClienteIntegracion } from './ClienteIntegracion.js';

dotenv.config();
/**
 * Cliente para enviar mensajes a través de la API de 
 * WhatsApp Business
 */
class FacebookClient extends ClienteIntegracion {
    /**
     * URL base de la API de WhatsApp Business utilizada para enviar mensajes.
     */
    static #API_URL = "https://graph.facebook.com/v23.0/564314080092964/messages";

    /**
     * Cabeceras HTTP necesarias para la autenticación y envío de mensajes.
     */
    static #HEADERS = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.TOKEN_WHATSAPP}`
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.validarConfiguracion(process.env.TOKEN_WHATSAPP, "TOKEN_WHATSAPP");
    }

    /**
     * Devuelve el nombre del servicio integrado.
     * @returns {string}
     */
    getServiceName() {
        return "WhatsApp Business";
    }

    /**
     * Envía un mensaje a través de la API de WhatsApp Business
     * @param {Object} mensaje Mensaje que se va a enviar.
     * @returns {Promise<void>}
     */
    async enviarMensaje(mensaje) {
        try {
            const response = await axios.post(FacebookClient.#API_URL, mensaje, {
                headers: FacebookClient.#HEADERS
            });
        } catch (error) {
            throw this.construirError("enviar el mensaje", error);
        }
    }
}

export { FacebookClient };
