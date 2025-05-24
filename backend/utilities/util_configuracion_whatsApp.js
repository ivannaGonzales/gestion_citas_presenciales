import axios from 'axios';
import { config } from 'dotenv';
import OpenAI from 'openai';
config();


const llamadaServicio = async (mensaje) => {

    try {
        const token = process.env.TOKEN_WHATSAPP
        const api_url = "https://graph.facebook.com/v21.0/564314080092964/messages"
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        await axios.post(api_url, mensaje, { headers });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al llamar al servicio de whatsApp',
            error: error.message
        });
    }

}

const generarRespuestaChatGPT = async (respuesta, motivo) => {
    try {
        const apikey = process.env.API_KEY;
        const openai = new OpenAI({
            apiKey: apikey
        });
        /*const prompt_inicial = (
            "Eres un asistente virtual que ayuda a gestionar citas presenciales. ",
            "Ya conoces el motivo de la cita " + motivo,
            "Solicita de forma educada al usuario solamente fecha y hora de la cita",
            "En el caso que solo te informen el dia tambien preguntar por la hora",
            "Confirma la cita con un resumen y ofrece ayuda adicional si la necesita.\n\n"
        )*/

        const prompt_inicial = (
            "Eres un gestor de citas presenciales. Tu tarea es preguntar al usuario por un día y una hora para la cita. Si el usuario solo responde con el día, debes insistir en que también proporcione la hora exacta antes de continuar."
        )

        var response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { "role": "system", "content": prompt_inicial },
                { "role": "user", "content": respuesta }
            ],
            max_tokens: 150,
            temperature: 0.5
        });
        return response.choices[0].message.content

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al generar respuesta de la IA',
            error: error.message
        });
    }

}



export {
    generarRespuestaChatGPT, llamadaServicio
};

