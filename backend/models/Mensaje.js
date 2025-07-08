import mongoose from "mongoose";

const mensajeSchema = new mongoose.Schema({ // ✅ Usa `new mongoose.Schema({...})`
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
        ref: "FechaParseada" // Relación directa con el modelo de fecha
    }
}, {
    timestamps: true // ✅ Ahora está dentro del objeto del esquema
});

const Mensaje = mongoose.model("Mensaje", mensajeSchema);

export default Mensaje;
