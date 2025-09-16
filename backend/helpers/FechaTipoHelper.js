class FechaTipoHelper {
    static #obtenerFechaYTipo(data) {
        const fechaObj = data.find(d => d.dim === "time");
        if (!fechaObj) return { tipo: "sin_fecha", value: null };

        const values = fechaObj.value?.values;
        const valuePrincipal = fechaObj.value?.value || null;

        if (!values || values.length === 0) {
            return { tipo: "sin_valores", value: valuePrincipal };
        }

        const grains = new Set(values.map(v => v.grain));
        const fechas = values.map(v => {
            const [fecha, hora] = v.value.split("T");
            const [año, mes, día] = fecha.split("-");
            const horaCompleta = hora.split(":").slice(0, 2).join(":"); // HH:MM
            return {
                diaMes: `${mes}-${día}`,
                hora: horaCompleta
            };
        });

        const diasUnicos = new Set(fechas.map(f => f.diaMes));
        const horasUnicas = new Set(fechas.map(f => f.hora));

        let tipo = "sin_tipo_definido";

        if (grains.size === 1 && grains.has("day")) {
            tipo = "dia";
        } else if (diasUnicos.size === 1) {
            tipo = "fecha_completa";
        } else if (horasUnicas.size === 1) {
            tipo = "hora";
        }

        return { fecha: valuePrincipal, tipo };
    }

    static extraerFechaYTipo(data) {
        return this.#obtenerFechaYTipo(data);
    }
}

export { FechaTipoHelper };
