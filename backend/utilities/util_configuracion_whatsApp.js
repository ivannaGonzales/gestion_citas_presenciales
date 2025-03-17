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

const generarRespuestaChatGPT = async (respuesta) => {
    try {
        console.log('dentro de generarRespuestaChatGPT')
        console.log('respuesta ', respuesta)
        const apikey = process.env.API_KEY;
        console.log('apiKey ', apikey)
        const openai = new OpenAI({
            apiKey: apikey
        });

        var response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { "role": "system", "content": "Soy un asistente especializado en gestión de citas presenciales" },
                { "role": "user", "content": respuesta }
            ],
            max_tokens: 150,
            temperature: 0.7
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

