

import FechaParseada from "../models/FechaParseada.js";


/**
 * Servicio encargado de gestionar operaciones relacionadas con el modelo FechaParseada.
 * @class
 */
class FechaParseadaService {
    /**
     * Constructor de la clase FechaParseadaService
     * @class
     */
    constructor() {

    }

    /**
     * Crea la fecha parseada
     * @param {String} fecha Fecha en formato ISO8601
     * @param {String} tipo Tipo de la fecha parseada
     */
    async crearFechaParseada(fecha, tipo) {
        const nuevaFecha = new FechaParseada({
            fecha: fecha,
            tipo: tipo
        });

        await nuevaFecha.save();

        return nuevaFecha;
    }
}

export { FechaParseadaService };
