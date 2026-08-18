export class OperacionCita {
    /**
     * Crea una operación de cita con su gestor principal.
     * @param {Object} params Dependencias de la operación.
     */
    constructor({ gestorCita }) {
        this.gestorCita = gestorCita;
    }
}
