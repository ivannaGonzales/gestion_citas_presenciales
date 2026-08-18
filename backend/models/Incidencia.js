import mongoose from "mongoose";


/**
 * Modelo que representa una incidencia 
 * telefonoContacto: Número de teléfono del cliente.
 * usuarioId: Referencia al usuario asociado.
 * motivo: Motivo de la incidencia.
 * fecha: Fecha en la que esté programada la cita creada por la incidencia.
 * resuelta: Incidencia resuelta si la cita ya está programada.
 */
const incidenciaSchema = mongoose.Schema({
    telefonoContacto: {
        type: Number,
        required: true,
        index: true
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: false,
        unique: true,
        sparse: true,
        index: true
    },
    motivo: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: false,
        default: Date.now
    },
    resuelta: {
        type: Boolean,
        required: true
    },
    mensajes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mensaje"
        }
    ]
}, {
    timestamps: true,
})

incidenciaSchema.index({ resuelta: 1, telefonoContacto: 1 });

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

export default Incidencia;
