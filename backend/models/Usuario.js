
import mongoose from "mongoose";
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido1: {
        type: String,
        required: true
    },
    apellido2: {
        type: String,
        required: true
    },

    dni: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        equired: true
    },

    telefono: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;