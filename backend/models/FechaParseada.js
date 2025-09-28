import mongoose from "mongoose";

/**
 * Esquema para representar una fecha interpretada desde un mensaje de texto
 * 
 * fecha Fecha en formato ISO 8601
 * tipo Granularidad de la fecha detectada. Puede ser "day", "week", "hour" o "minute".
 */
const fechaParseadaSchema = new mongoose.Schema({
    fecha: {
        type: String, // o Date si ya está normalizada
        required: true
    },
    tipo: {
        type: String,
        enum: ["dia", "hora", "fecha_completa"],
        required: true
    }
}, { timestamps: true });

const FechaParseada = mongoose.model("FechaParseada", fechaParseadaSchema);
export default FechaParseada;
