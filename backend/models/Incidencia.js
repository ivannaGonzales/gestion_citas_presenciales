import mongoose from "mongoose";


const incidenciaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },

    fecha: {
        type: Date,
        required: false,
        default: Date.now()
    },
    incidencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incidencia"
    },

    resuelta: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
})

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

export default Incidencia;