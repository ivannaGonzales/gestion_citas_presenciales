class FechaTipoHelper {
    static #obtenerFechaYTipo(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return null;
        }

        let fecha = null;
        let tipo = null;

        for (const item of data) {
            if (item.value?.values?.length > 0) {
                const primeraFecha = item.value.values[0];
                fecha = primeraFecha.value;
                tipo = primeraFecha.grain;
                break;
            }
        }

        return { fecha, tipo };
    }

    static extraerFechaYTipo(data) {
        return this.#obtenerFechaYTipo(data);
    }
}

export { FechaTipoHelper };
