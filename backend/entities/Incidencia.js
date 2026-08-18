/**
 * Representa una incidencia registrada en el sistema
 */
class Incidencia {
    /**
     * Crea una nueva incidencia de dominio.
     * @param {Object} params Datos de la incidencia.
     */
    constructor({ id, telefonoContacto, motivo, fecha, resuelta }) {
        this.id = id;
        this.telefonoContacto = telefonoContacto;
        this.motivo = motivo;
        this.fecha = fecha;
        this.resuelta = resuelta;
    }

    /**
     * Devuelve el identificador de la incidencia.
     * @returns {*}
     */
    getId() {
        return this.id;
    }


    /**
     * Devuelve el teléfono asociado a la incidencia.
     * @returns {*}
     */
    obtenerTelefonoContacto() {
        return this.telefonoContacto;
    }

    /**
     * Devuelve el motivo de la incidencia.
     * @returns {string}
     */
    getMotivo() {
        return this.motivo;
    }
}

export { Incidencia };
