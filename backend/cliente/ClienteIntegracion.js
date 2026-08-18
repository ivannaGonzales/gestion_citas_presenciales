class ClienteIntegracion {
    /**
     * Devuelve el nombre legible del servicio externo.
     * @returns {string}
     */
    getServiceName() {
        throw new Error("La subclase debe definir getServiceName()");
    }

    /**
     * Valida que una configuración obligatoria exista.
     * @param {*} valor Valor a validar.
     * @param {string} nombreConfiguracion Nombre de la configuración.
     * @returns {*} El valor recibido si es válido.
     */
    validarConfiguracion(valor, nombreConfiguracion) {
        if (!valor) {
            throw new Error(`Falta la configuración obligatoria "${nombreConfiguracion}" para ${this.getServiceName()}`);
        }

        return valor;
    }

    /**
     * Construye un error contextualizado para el cliente.
     * @param {string} accion Acción que estaba ejecutando.
     * @param {Error} error Error original.
     * @returns {Error}
     */
    construirError(accion, error) {
        return new Error(`Error en ${this.getServiceName()} al ${accion}: ${error.message}`);
    }
}

export { ClienteIntegracion };
