

import moment from "moment-timezone";
import { Constantes } from '../constantes/Constantes.js';

class FechaUTCUtils {
    /**
    * Normaliza una fecha con zona horaria a UTC y la formatea según el formato definido.
    * @param {string} fecha Fecha en formato reconocible por moment.js (puede incluir zona horaria).
    * @returns {string} Fecha en formato UTC con el formato definido en Constantes.FORMATO_FECHA.
    */
    static normalizarFechaUTC(fecha) {
        if (!fecha) return null;
        return moment.parseZone(fecha).utcOffset(0, true).format(Constantes.FORMATO_FECHA);
    }
    /**
    * Formatea una fecha respetando su zona horaria original.
    * @param {string} fecha Fecha con zona horaria.
    * @returns {string} Fecha formateada como "YYYY-MM-DD".
    */
    static obtenerDia(fecha) {
        if (!fecha) return null;
        return moment.parseZone(fecha).format(Constantes.FORMATO_DIA);
    }

    static obtenerHoraUTC(fecha) {
        if (!fecha) return null;
        return moment.parseZone(fecha).utcOffset(0, true).format(Constantes.FORMATO_HORA);
    }
}


export { FechaUTCUtils };
