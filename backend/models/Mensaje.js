import mongoose from "mongoose";

/**
 * Modelo que representa un mensaje enviado por un cliente durante una conversación
 * telefono: Número del cliente
 * contenido: Contenido del mensaje
 * incidencia: Incidencia que esta relacionado con la conversación
 * fechaParseada: Fecha parseada
 */
const mensajeSchema = new mongoose.Schema({
    telefono: {
        type: Number,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    incidencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incidencia"
    },
    fechaParseada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FechaParseada"
    }
}, {
    timestamps: true
});

const Mensaje = mongoose.model("Mensaje", mensajeSchema);

export default Mensaje;
