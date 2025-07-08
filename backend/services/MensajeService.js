import Incidencia from "../models/Incidencia.js";
import Mensaje from "../models/Mensaje.js";

const PALABRA_NEGATIVA = "no";


class MensajeService {

    static async buscarPorContenidoYTelefono(contenido, telefono) {
        return await Mensaje.findOne({ contenido, telefono });
    }

    static async guardarMensaje(respuesta, telefono) {
        const incidencia = await Incidencia.findOne({ numero: telefono }).select("_id"); // Solo devuelve el ID
        const idIncidencia = incidencia ? incidencia._id : null; // Guarda el ID en una variable
        const duplicado = await Mensaje.findOne({ telefono, contenido: respuesta });
        if (duplicado) {
            console.log("El mensaje ya existe. No se guarda duplicado.");
            return;
        }

        if (respuesta.toLowerCase() !== PALABRA_NEGATIVA) {
            const nuevoMensaje = new Mensaje({
                telefono: telefono,
                contenido: respuesta,
                incidencia: idIncidencia
            });
            await nuevoMensaje.save();
        }

    }

    static async obtenerMensajeById(id) {
        const mensaje = await Mensaje.findOne(id).select("contenido");
        return mensaje?.contenido;
    }

    static async obtenerMensajes(telefono) {
        let mensajes = null;
        try {
            mensajes = await Mensaje.find({ telefono })
        }
        catch (error) {
            mensajes = null;
        }
        return mensajes;

    }

    static async obtenerContenidosMensajes(telefono) {
        try {
            const mensajes = await Mensaje.find({ telefono }).select("contenido"); // Solo obtiene el contenido
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

