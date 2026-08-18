import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { ClienteIntegracion } from './ClienteIntegracion.js';

dotenv.config();
/**
 * Cliente para interactuar con la API de OpenAI
 */
class IAClient extends ClienteIntegracion {
    /**
     * Construye el cliente de OpenAI con la configuración del entorno.
     */
    constructor() {
        super();
        this.apiKey = this.validarConfiguracion(process.env.API_KEY, "API_KEY");
        this.openai = new OpenAI({
            apiKey: this.apiKey
        });
    }

    /**
     * Devuelve el nombre del servicio integrado.
     * @returns {string}
     */
    getServiceName() {
        return "OpenAI";
    }

    /**
     * Construye el prompt que define el comportamiento del asistente de IA
     * @param {String} motivo - Motivo de la cita que debe influir en la respuesta 
     * @returns {String} Prompt completo para el modelo de IA
     */
    construirPrompt(motivo) {
        return `
        Eres un gestor de citas presenciales. Tu tarea es:
            1. Preguntar al usuario por un dia y una hora para la cita.
            2. Si el usuario solo responde con el dia, insistir en que tambien proporcione la hora exacta antes de continuar.
            3. No repetirte si ya te dieron el dato.
            4. Adaptar la respuesta especificamente a este motivo: ${motivo}.
            5. Si el usuario corrige el dia pero no menciona la hora, asumir que la hora anterior sigue siendo valida.
            6. Verificar que la cita no caiga en fin de semana.
            7. Verificar que la hora solicitada este entre las 08:00 y las 20:00.
            8. Si la fecha cae en sabado o domingo, indicar al usuario que no se pueden ofrecer citas en fin de semana y pedirle un nuevo dia laborable.
            9. Si la hora esta fuera del rango de 08:00 a 20:00, indicar al usuario que no se pueden ofrecer citas en ese horario y pedirle una nueva hora dentro del rango permitido.
        `;
    }


    /**
     * Genera una respuesta de seguimiento basada en los mensajes del usuario
     * y el motivo de la cita
     * @param {string} mensajes Conversación del usuario.
     * @param {string} motivo Motivo de la cita.
     * @returns {Promise<string>} Respuesta generada por el modelo de IA.
     */
    async generarRespuestaSeguimiento(mensajes, motivo) {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-5',
                messages: [
                    { role: "system", content: this.construirPrompt(motivo) },
                    { role: "user", content: mensajes }
                ]
            });
            console.log(" IA " + response.choices[0].message.content)
            return response.choices[0].message.content;
        } catch (error) {
            throw this.construirError("generar la respuesta", error);
        }
    }
}

export { IAClient };
