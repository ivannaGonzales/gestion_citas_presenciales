import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { Incidencia } from "../entities/Incidencia.js";


dayjs.extend(utc);
/**
 * Servicio encargado de gestionar operaciones relacionadas con la entidad Incidencia
 */
export class IncidenciaService {
    /**
     * Crea un servicio de incidencias.
     * @param {Object} incidenciaRepository Repositorio de incidencias.
     */
    constructor(incidenciaRepository) {
        this.incidenciaRepository = incidenciaRepository;
    }

    /**
     * Actualiza la fecha de una incidencia usando el objeto incidencia.
     * @param {Incidencia} incidencia Incidencia de dominio.
     * @param {Date|string} fechaCita Fecha de la cita.
     * @returns {Promise<*>}
     */
    async actualizarCita(incidencia, fechaCita) {
        const incidenciaId = this.#obtenerIdIncidencia(incidencia);

        if (!incidenciaId) {
            throw new Error("La incidencia proporcionada no es valida");
        }

        return this._actualizarCitaPorId(incidenciaId, fechaCita);
    }


    /**
     * Lógica común para actualizar una incidencia.
     * @param {string|ObjectId} id Identificador de la incidencia.
     * @param {Date|string} fecha Fecha de la cita.
     * @returns {Promise<*>}
     */
    async _actualizarCitaPorId(id, fecha) {
        const incidenciaActualizada = await this.incidenciaRepository.update(
            id,
            {
                $set: {
                    fecha: dayjs.utc(fecha).toDate(),
                    resuelta: true
                }
            }
        );

        if (!incidenciaActualizada) {
            throw new Error(`No se encontro la cita para actualizar con el id: ${id}`);
        }

        return incidenciaActualizada;
    }

    /**
     * Obtiene el motivo de una incidencia filtrando por teléfono.
     * @param {string|number} telefono Teléfono de búsqueda.
     * @returns {Promise<string|null>}
     */
    async obtenerMotivo(telefono) {
        const incidencia = await this.obtenerIncidenciaPorTelefono(telefono);
        return incidencia?.getMotivo() ?? null;
    }



    /**
     * Busca una incidencia cuya fecha esté dentro de una hora desde la fecha dada.
     * @param {Date|string} fecha Fecha de referencia.
     * @returns {Promise<*>}
     */
    async buscarPorFecha(fecha) {
        const fechaInicio = dayjs.utc(fecha);
        const fechaFin = fechaInicio.add(1, 'hour');

        return this.incidenciaRepository.findOne({
            resuelta: true,
            fecha: {
                $gte: fechaInicio.toDate(),
                $lt: fechaFin.toDate()
            }
        });
    }

    /**
     * Obtiene la primera incidencia activa (no resuelta).
     * @returns {Promise<Incidencia|null>}
     */
    async obtenerIncidenciaActiva() {
        const incidencia = await this.incidenciaRepository.findOne({ resuelta: false });
        return this.#mapearIncidencia(incidencia);
    }

    /**
     * Obtiene la incidencia asociada a un teléfono.
     * @param {string|number} telefono Teléfono de búsqueda.
     * @returns {Promise<Incidencia|null>}
     */
    async obtenerIncidenciaPorTelefono(telefono) {
        const incidencia = await this.incidenciaRepository.findOne({
            telefonoContacto: telefono
        });
        return this.#mapearIncidencia(incidencia);
    }

    /**
     * Comprueba si una fecha está disponible.
     * @param {Date|string} fecha Fecha a comprobar.
     * @returns {Promise<boolean>} `true` si la fecha está disponible.
     */
    async estaFechaDisponible(fecha) {
        const existe = await this.buscarPorFecha(fecha);

        return !existe;
    }

    /**
     * Convierte el documento de base de datos en una incidencia de dominio.
     * @param {*} incidencia Documento de Mongoose.
     * @returns {Incidencia|null}
     */
    #mapearIncidencia(incidencia) {
        if (!incidencia) {
            return null;
        }

        return new Incidencia({
            id: incidencia._id,
            telefonoContacto: incidencia.telefonoContacto,
            motivo: incidencia.motivo,
            fecha: incidencia.fecha,
            resuelta: incidencia.resuelta
        });
    }

    /**
     * Obtiene el identificador de una incidencia de dominio o de un documento bruto.
     * @param {*} incidencia Incidencia.
     * @returns {string|null}
     */
    #obtenerIdIncidencia(incidencia) {
        if (!incidencia) {
            return null;
        }

        return incidencia.getId?.() ?? incidencia._id ?? incidencia.id ?? null;
    }
}
