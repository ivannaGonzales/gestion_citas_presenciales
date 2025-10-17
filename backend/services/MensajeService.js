import { Constantes } from '../constantes/Constantes.js';
import Incidencia from "../models/Incidencia.js";
import Mensaje from "../models/Mensaje.js";


/**
 * Servicio para gestionar operaciones relacionadas con mensajes.
 */
class MensajeService {

    /**
     * Constructor de la clase MensajeService
     * @constructor
     */
    constructor() {

    }
    /**
     * Obtiene el mensaje por contenido y teléfono
     * @param {String} contenido 
     * @param {Number} telefono 
     * @returns {Mensaje}
     */
    async obtenerMensaje(contenido, telefono) {
        let mensaje = null;
        if (contenido.toLowerCase() !== Constantes.PALABRA_NEGATIVA) {
            try {
                /** mensajes = await Mensaje.find({ telefono })
                .populate(Constantes.FECHA_PARSEADA)
                .sort({ createdAt: 1 });*/
                mensaje = await Mensaje.findOne({ contenido, telefono }).populate(Constantes.FECHA_PARSEADA);
            } catch (error) {
                throw new Error("No se encontró ningún mensaje con ese contenido y teléfono.");
            }

        }
        return mensaje
    }

    /**
     * Guarda el mensaje
     * @param {String} respuesta Contenido del mensaje
     * @param {Number} telefono Número de teléfono del cliente
     */
    async guardarMensaje(respuesta, telefono) {
        const usuario = await Usuario.findOne({ telefono });
        const incidencia = await Incidencia.findOne({ usuario: usuario._id }).select("_id");
        const idIncidencia = incidencia ? incidencia._id : null; // Guarda el ID en una variable
        const duplicado = await Mensaje.findOne({ telefono, contenido: respuesta });
        if (duplicado) {
            console.log("El mensaje ya existe. No se guarda duplicado.");
            return;
        }

        if (respuesta.toLowerCase() !== Constantes.PALABRA_NEGATIVA) {
            const nuevoMensaje = new Mensaje({
                telefono: telefono,
                contenido: respuesta,
                incidencia: idIncidencia
            });
            await nuevoMensaje.save();
        }

    }
    /**
     * Obtiene los mensajes de un teléfono
     * @param {Number} telefono 
     * @returns {Mensaje} Mensajes
     */
    async obtenerMensajes(telefono) {
        let mensajes = null;
        try {
            mensajes = await Mensaje.find({ telefono })
                .populate(Constantes.FECHA_PARSEADA)
                .sort({ createdAt: 1 });

            mensajes = mensajes.filter(
                m => m.contenido.trim().toLowerCase() !== Constantes.PALABRA_NEGATIVA
            );
        }
        catch (error) {
            mensajes = null;
        }
        return mensajes;

    }

    /**
     * Obtine el contenido del teléfono
     * 
     * @param {Number} telefono 
     * @returns {String} Contenido de los mensajes
     */
    async obtenerConversacion(telefono) {
        try {
            const mensajes = await Mensaje.find({ telefono }).select(Constantes.CONTENIDO); // Solo obtiene el contenido
            const contenidos = mensajes.map(mensaje => mensaje.contenido); // Extrae solo los valores
            const oracion = contenidos.join(" "); // Une todos los mensajes en una sola oración
            return oracion;
        } catch (error) {
            console.error("Error al obtener los contenidos:", error);
            return "";
        }
    };
}


export { MensajeService };

