import moment from "moment-timezone";
import { Constantes } from '../constantes/Constantes.js';
import Incidencia from "../models/Incidencia.js";

/**
 * Servicio encargado de gestionar las incidencias relacionadas con citas.
 * @class
 */
class IncidenciaService {

    /**
     * Constructor de la clase IncidenciaService
     * @constructor
     */
    constructor() {

    }

    /**
     * Actualiza la fecha de una cita y la marca como resuelta.
     * @param {String} usuario Cliente
     * @param {Number} telefono Número del teléfono
     * @param {Fecha} fechaCitaInicial Fecha de la cita presencial
     * @returns {Fecha} fecha actualizada
     */
    async actualizarCita(usuario, telefono, fechaCitaInicial) {
        try {
            const incidenciaActualizada = await Incidencia.findOneAndUpdate(
                { nombre: usuario, numero: telefono },
                { $set: { fecha: fechaCitaInicial, resuelta: true } },
                { new: true } // Devuelve el documento actualizado
            );

            if (!incidenciaActualizada) {
                throw new Error('No se encontró la cita para actualizar');
            }

            return incidenciaActualizada;
        } catch (error) {
            throw new Error('No se ha podido actualizar incidencia')
        }

    }

    /**
     * Obtiene el motivo por el cual el cliente quiere una cita presencial
     * @param {*} usuario Cliente
     * @param {*} telefono Número de teléfono del cliente
     * @returns {String} Devuelve el motivo de la incidencia
     */
    async obtenerMotivo(telefono) {// cambiar nombre
        let resultado = null;
        try {
            resultado = await Incidencia.findOne(
                { resuelta: false },
                { _id: 0, motivo: 1 }
            ).populate({
                path: 'usuario',
                select: 'telefono' // solo trae el campo teléfono del usuario
            });
        } catch (error) {
            throw new Error('No se pudo encontrar el motivo de la cita ', telefono);
        }

        return resultado?.motivo || null;
    }

    /**
     * Busca una incidencia cuya fecha esté dentro de una hora desde la fecha proporcionada.
     * @param {Fecha} fecha 
     * @returns {Incidencia} La incidencia encontrada o null si no hay coincidencias.
     */
    async buscarPorFecha(fecha) {
        return await Incidencia.findOne({
            fecha: {
                $gte: fecha.toDate(),
                $lt: moment(fecha).add(1, Constantes.HOUR).toDate()
            }
        });
    }

    /**
     * Obtiene una incidencia pendiente (no resuelta).
     * @returns {Incidencia} La primera incidencia no resuelta encontrada.
     * @throws {Error} - Si ocurre un error durante la búsqueda
     */
    async obtenerIncidencia() {
        let incidencia = null;
        try {
            incidencia = await Incidencia.findOne({ resuelta: false });
        } catch (error) {
            throw new Error(`Error al buscar incidencia: ${error.message}`);

        }
        return incidencia;
    }
}

export { IncidenciaService };
