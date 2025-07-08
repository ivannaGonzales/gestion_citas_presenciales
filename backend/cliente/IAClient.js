
import { llamadaServicio } from "./FacebookClient.js";
const respuestaChatGPT = async (respuesta, telefono, motivo) => {


    const responseChatGPT = await generarRespuestaChatGPT(respuesta, motivo);

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

    return responseChatGPT;
}

const generarRespuestaChatGPT = async (respuesta, motivo) => {
    try {


        const apikey = process.env.API_KEY;
        const openai = new OpenAI({
            apiKey: apikey
        });

        const prompt_inicial = (
            "Eres un gestor de citas presenciales. Tu tarea es preguntar al usuario por un día y una hora para la cita. Si el usuario solo responde con el día, debes insistir en que también proporcione la hora exacta antes de continuar. Y no te repitas si ya te dieron el dato"
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


export { respuestaChatGPT };
