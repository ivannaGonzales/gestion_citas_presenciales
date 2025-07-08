import mongoose from "mongoose";

const fechaParseadaSchema = new mongoose.Schema({
    fecha: {
        type: String, // o Date si ya está normalizada
        required: true
    },
    tipo: {
        type: String,
        enum: ["day", "week", "hour", "minute"],
        required: true
    }
}, { timestamps: true });

const FechaParseada = mongoose.model("FechaParseada", fechaParseadaSchema);
export default FechaParseada;
