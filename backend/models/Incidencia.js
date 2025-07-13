import mongoose from "mongoose";


/**
 * Modelo que representa una incidencia 
 * nombre: Nombre del cliente.
 * motivo: Motivo de la incidencia.
 * numero: Número de teléfono del cliente.
 * fecha: Fecha en la que esté programada la cita creada por la incidencia
 * resulta: Inicidencia resuelta si la cita ya está programda
 */
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