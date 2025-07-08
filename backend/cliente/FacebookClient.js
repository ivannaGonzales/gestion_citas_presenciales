import axios from 'axios';
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


export { llamadaServicio };
