import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    empresaId: {
        type: String,
        required: true
    }

}, { timestamp: true });
const Empresa = mongoose.model("Empresa", empresaSchema);

export default Empresa; 