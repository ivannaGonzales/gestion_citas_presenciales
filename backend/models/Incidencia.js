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
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    motivo: {
        type: String,
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
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa"
    }
}, {
    timestamps: true,
})

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

export default Incidencia;