import bcrypt from "bcrypt";
import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
const VeterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
})

//antes de que se guarde el registro
//el next lo que hace es ir al siguiente middleware
VeterinarioSchema.pre('save', async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

VeterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = mongoose.model("Veterinario", VeterinarioSchema)

export default Veterinario;