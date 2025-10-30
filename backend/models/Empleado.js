import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario", // referencia al modelo Usuario
        required: true
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required: true
    },
    rol: {
        type: String,
        enum: ["empleado", "tecnico", "coordinador", "admin"],
        default: "empleado",
        required: true
    }
}, {
    timestamps: true
});

const Empleado = mongoose.model("Empleado", empleadoSchema);

export default Empleado;
