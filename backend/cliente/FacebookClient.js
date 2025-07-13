import axios from 'axios';

/**
 * Clase que se encarga de llamar al api de Facebook para mandar mensajes
 * vía whatsApp
 */
class FacebookClient {
    /**
     * Constructor de la clase FacebookClient
     * @constructor
     */
    constructor() {
        /**
         * Url base del API de WhatsApp Business
         * @type {string}
         */
        this.api_url = "https://graph.facebook.com/v21.0/564314080092964/messages";
        /**
         * Encabezados HTTP para la autenticación y formato de mensajes
         * @type {object}
         * Content-Type @type {string}
         * Authorization @type {string}
         */
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.TOKEN_WHATSAPP}`
        };
    }

    /**
     * Envía un mensaje a través de la API de WhatsApp Business
     * @param {String} mensaje 
     */
    async llamadaServicio(mensaje) {
        try {
            await axios.post(api_url, mensaje, { headers });

        } catch (error) {
            throw new Error('Error al llamar al servicio de whatsApp');
        }
    }
}

export { FacebookClient };
