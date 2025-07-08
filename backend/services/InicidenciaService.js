import moment from "moment-timezone";
import Incidencia from "../models/Incidencia.js";
class IncidenciaService {

    static async actualizarCita(usuario, telefono, fechaCitaInicial) {
        await Incidencia.findOneAndUpdate(
            { usuario, telefono },
            { $set: { fechaCitaInicial, resuelta: true } }
        );
    }

    static async obtenerMotivoCita(nombre, numero) {
        const resultado = await Incidencia.findOne(
            { nombre, numero },
            { _id: 0, motivo: 1 }
        );
        return resultado?.motivo || null;
    }

    static async buscarPorFechaSugerida(fechaSugerida) {
        return await Incidencia.findOne({
            fecha: {
                $gte: fechaSugerida.toDate(),
                $lt: moment(fechaSugerida).add(1, "hour").toDate()
            }
        });
    }
}

export { IncidenciaService };
