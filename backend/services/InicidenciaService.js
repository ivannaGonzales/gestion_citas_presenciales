import moment from "moment-timezone";
import { Constantes } from '../constantes/Constantes.js';
import Incidencia from "../models/Incidencia.js";
class IncidenciaService {

    constructor() {

    }

    async actualizarCita(usuario, telefono, fechaCitaInicial) {
        await Incidencia.findOneAndUpdate(
            { nombre: usuario, numero: telefono },
            { $set: { fecha: fechaCitaInicial, resuelta: true } },
            { new: true } // Devuelve el documento actualizado
        );
    }

    async obtenerMotivoCita(nombre, numero) {
        const resultado = await Incidencia.findOne(
            { nombre, numero },
            { _id: 0, motivo: 1 }
        );
        return resultado?.motivo || null;
    }

    async buscarPorFechaSugerida(fechaSugerida) {
        return await Incidencia.findOne({
            fecha: {
                $gte: fechaSugerida.toDate(),
                $lt: moment(fechaSugerida).add(1, Constantes.HOUR).toDate()
            }
        });
    }

    async obtenerIncidencia() {
        return await Incidencia.findOne({ resuelta: false });
    }
}

export { IncidenciaService };
