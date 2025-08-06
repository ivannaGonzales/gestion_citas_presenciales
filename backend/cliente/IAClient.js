
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { FacebookClient } from "./FacebookClient.js";
dotenv.config();

/**
 * Clase que genera la respuesta de IA con rol de gestor de citas
 */
class IAClient {
    /**
     * Constructor de la clase IAClient
     * @constructor
     */
    constructor() {
        /**
         * Cliente de Facebook para WhatsApp Business
         * @type {FacebookClient}
         */
        this.facebookClient = new FacebookClient();
    }

    /**
     * Envía la respuesta de la IA al cliente mediante el API de WhatsApp Business
     * @param {String} mensajes Mensajes de la respuesta del cliente
     * @param {String} telefono Telefono del cliente
     * @param {String} motivo Motivo de la cita
     * @returns {String} Respuesta generada por IA
     */
    async respuestaChatGPT(mensajes, telefono, motivo) {

        const responseChatGPT = await this.generarRespuestaChatGPT(mensajes, motivo)
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
        await this.facebookClient.llamadaServicio(mensaje)

        return responseChatGPT;
    }

    /**
     * Genera una respuesta de IA para la gestión de citas
     * Esta función coordina con el gestor de citas para obtener respuestas personalizadas
     * basadas en el motivo de la consulta
     * @param {String} mensaje Respuesta del usuario 
     * @param {String} motivo Motivo de la cita
     * @returns Respuesta de la IA
     */
    async generarRespuestaChatGPT(mensajes, motivo) {
        try {
            const apikey = process.env.API_KEY;
            const openai = new OpenAI({
                apiKey: apikey
            });

            /*const prompt_inicial = (
                "Eres un gestor de citas presenciales. Tu tarea es preguntar al usuario por un día y una hora para la cita. Si el usuario solo responde con el día, debes insistir en que también proporcione la hora exacta antes de continuar. Y no te repitas si ya te dieron el dato"
            )*/
            const prompt_inicial = `
                Eres un gestor de citas presenciales. Tu tarea es:
                1. Preguntar al usuario por un día y una hora para la cita
                2. Si el usuario solo responde con el día, debes insistir en que también proporcione la hora exacta antes de continuar
                3. No te repitas si ya te dieron el dato
                4. Este es un ${motivo} y debes adaptar tu respuesta específicamente para este tipo de cita
            `;

            var response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { "role": "system", "content": prompt_inicial },
                    { "role": "user", "content": mensajes }
                ],
                max_tokens: 150,
                temperature: 0.5
            });

            return response.choices[0].message.content

        } catch (error) {
            throw new Error('Error al generar respuesta de la IA');
        }

    }
}





export { IAClient };
