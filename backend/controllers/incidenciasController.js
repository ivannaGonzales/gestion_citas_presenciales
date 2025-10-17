import Empresa from "../models/Empresa.js";
import Incidencia from "../models/Incidencia.js";


const getIncidenciasEmpresa = async (req, res) => {
    const { empresaId } = req.params;
    try {
        const empresa = await Empresa.findOne({ empresaId: empresaId });
        const incidencias = await Incidencia.find({ empresa: empresa._id }).select("-_id").populate("usuario", "nombre apellido1 apellido2 -_id").populate("empresa", "nombre -_id");
        res.status(200).json(incidencias);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener incidencias de la empresa" });
    }
}
export { getIncidenciasEmpresa };
