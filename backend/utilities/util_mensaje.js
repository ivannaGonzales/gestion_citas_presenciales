import Incidencia from "../models/Incidencia.js";
import Mensaje from "../models/Mensaje.js";


const guardarMensaje = async (respuesta, telefono) => {
    const incidencia = await Incidencia.findOne({ numero: telefono }).select("_id"); // Solo devuelve el ID
    const idIncidencia = incidencia ? incidencia._id : null; // Guarda el ID en una variable
    //34625958554
    const nuevoMensaje = new Mensaje({
        telefono: telefono,
        contenido: respuesta,
        incidencia: idIncidencia
    });

    await nuevoMensaje.save();
}
const obtenerMensajeById = async (id) => {
    return await Mensaje.findOne(id).select("contenido");
}
const obtenerMensajes = async (telefono) => {
    let mensajes = null;
    try {
        mensajes = await Mensaje.find({ telefono })
    }
    catch (error) {
        console.log('error')
        mensajes = null;
    }
    return mensajes;

}


const obtenerContenidosMensajes = async (telefono) => {
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

export { guardarMensaje, obtenerContenidosMensajes, obtenerMensajeById, obtenerMensajes };

