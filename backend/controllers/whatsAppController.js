
import {
    getTextUser
} from '../utilities/util.js';

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
        return res.json({ challenge });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};
//Esta llamada es lo que hace obtengo la informacion que me ha devuelvto el usuario
// simulamos desde postman el envio del mensjae
const receiveMessage = async (req, res) => {

    try {
        // Obtener el cuerpo de la solicitud
        const body = req.body;

        // Extraer el mensaje del primer entry
        const firstEntry = body.entry[0];
        const firstChange = firstEntry.changes[0];
        const messageData = firstChange.value.messages[0];

        // Obtener el texto del mensaje
        const text = await getTextUser(messageData)
        const number = messageData.from
        console.log('text ', text)
        console.log('number ', number)
        // Enviar respuesta de confirmación
        //
        sendMessageWhatsApp(text, number);
        return res.status(200).json({
            success: true,
            message: 'EVENT_RECEIVED'
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al procesar el mensaje',
            error: error.message
        });
    }
};
const sendMessageWhatsApp = async (textUser, number) => {
    //textUser: lo que me envio el usuario 
    //number 
    try {
        token = "EAA3AEzLOX2QBO7TunDZCEfZAvq0yMAl4BqZAsrhbjfz0fqV46kuvhZC854ZAMWpSxf6CHbjnSlZBhWszgXcUcpAgsq4hbMpZBJ2kOzjtfz68VAopZCac2RHaEq2MjBLWRMQskS6raDpJlTz78hZAvpenuOAg4GKYZBVx9lFoaW0TMO0SMKCqZCSlfXyqZCYdZALzVvtOnkQZDZD"
        api_url = "https://graph.facebook.com/v21.0/564314080092964/messages"
        const mensaje = {
            "messaging_product": "whatsapp",
            "to": "625958554",
            "type": "template",
            "template": {
                "name": "prueba_trabajo_final_grado",
                "language": {
                    "code": "es"
                }
            }
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        console.log('antes de hacer la llamada')
        const response = await axios.post(api_url, mensaje, { headers });
        console.log('Mensaje enviado exitosamente:', response.data);
    }
    catch (error) {
        console.error('Error al enviar el mensaje:', error.response?.data || error.message);
    }
}
export {
    configurarTokenWhatsApp,
    receiveMessage
};

