class FechaTipoHelper {
    static #seleccionarValorPrincipal(fechaObj, textoOriginal = "") {
        const values = fechaObj.value?.values || [];
        const textoNormalizado = textoOriginal
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        let rangoHorario = null;

        if (/(?:de|por) la manana\b/.test(textoNormalizado)) {
            rangoHorario = (hora) => hora >= 0 && hora < 12;
        } else if (/(?:de|por) la tarde\b/.test(textoNormalizado)) {
            rangoHorario = (hora) => hora >= 12 && hora < 20;
        } else if (/(?:de|por) la noche\b/.test(textoNormalizado)) {
            rangoHorario = (hora) => hora >= 20 || hora < 6;
        }

        if (rangoHorario) {
            const alternativa = values.find((value) => {
                const hora = Number(value.value?.split("T")[1]?.slice(0, 2));
                return Number.isInteger(hora) && rangoHorario(hora);
            });

            if (alternativa?.value) {
                return alternativa.value;
            }
        }

        return fechaObj.value?.value || null;
    }

    static #contieneDiaExplicito(texto = "") {
        const textoNormalizado = texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const expresionesDia = [
            /\b(?:hoy|pasado manana|anteayer)\b/,
            /(?<!\bla )\bmanana\b/,
            /\b(?:lunes|martes|miercoles|jueves|viernes|sabado|domingo)\b/,
            /\b\d{1,2}\s+de\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/,
            /\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/,
            /\b\d{4}-\d{2}-\d{2}\b/
        ];

        return expresionesDia.some((expresion) => expresion.test(textoNormalizado));
    }

    static #obtenerFechaYTipo(data, textoOriginal = "") {
        const fechaObj = data.find((dimension) => dimension.dim === "time");
        if (!fechaObj) {
            return { tipo: "sin_fecha", fecha: null };
        }

        const values = fechaObj.value?.values;
        const valuePrincipal = this.#seleccionarValorPrincipal(fechaObj, textoOriginal);

        if (!values || values.length === 0) {
            return { tipo: "sin_fecha", fecha: valuePrincipal };
        }

        const grains = new Set(values.map((value) => value.grain));
        const fechasNormalizadas = values.map((value) => {
            const [fecha = "", hora = ""] = value.value.split("T");
            const [anyo, mes, dia] = fecha.split("-");
            const horaCompleta = hora.split(":").slice(0, 2).join(":");

            return {
                fechaCompleta: `${anyo}-${mes}-${dia}`,
                diaMes: `${mes}-${dia}`,
                hora: horaCompleta
            };
        });

        const fechasUnicas = new Set(fechasNormalizadas.map((fecha) => fecha.fechaCompleta));
        const diasMesUnicos = new Set(fechasNormalizadas.map((fecha) => fecha.diaMes));
        const horasUnicas = new Set(
            fechasNormalizadas
                .map((fecha) => fecha.hora)
                .filter(Boolean)
        );

        const soloDia = grains.size === 1 && grains.has("day");
        const soloHora = grains.size === 1 && ["hour", "minute", "second"].some((grain) => grains.has(grain));
        const contieneDiaExplicito = this.#contieneDiaExplicito(fechaObj.body);

        let tipo = "sin_fecha";

        if (soloDia) {
            tipo = "dia";
        } else if (
            (contieneDiaExplicito && horasUnicas.size > 0) ||
            (horasUnicas.size === 1 && (fechasUnicas.size === 1 || diasMesUnicos.size === 1))
        ) {
            tipo = "fecha_completa";
        } else if (soloHora || horasUnicas.size === 1) {
            tipo = "hora";
        }

        return { fecha: valuePrincipal, tipo };
    }

    static extraerFechaTipo(data, textoOriginal = "") {
        return this.#obtenerFechaYTipo(data, textoOriginal);
    }
}

export { FechaTipoHelper };
