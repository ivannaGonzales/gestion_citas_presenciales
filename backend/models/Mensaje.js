import mongoose from "mongoose";

/**
 * Modelo que representa un mensaje dentro de una conversación
 * contenido: Contenido del mensaje
 * incidencia: Incidencia a la que pertenece la conversación
 * fecha_parseada: { fecha: Date, tipo: dia|hora|fecha_completa } si existe
 * emisor: Indica si el mensaje lo envía el sistema o el cliente
 */
const fechaParseadaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum: ["dia", "hora", "fecha_completa"],
        required: true
    }
}, { _id: false });

const mensajeSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true
    },
    incidencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incidencia",
        required: true,
        index: true
    },
    fecha_parseada: {
        type: fechaParseadaSchema,
        default: null
    }
}, {
    timestamps: true
});

mensajeSchema.index({ incidencia: 1, createdAt: 1 });

const Mensaje = mongoose.model("Mensaje", mensajeSchema);
export default Mensaje;
