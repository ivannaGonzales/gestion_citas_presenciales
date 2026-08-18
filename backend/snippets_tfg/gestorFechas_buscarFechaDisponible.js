    async buscarFechaDisponible() {
        let fechaSugerida = dayjs.utc().add(1, "hour").startOf("hour");
        const limiteBusqueda = dayjs.utc().add(CONFIG_CITA.MAX_DIAS, "day");

        while (fechaSugerida.isBefore(limiteBusqueda)) {
            // Validar si está fuera de horario comercial
            if (fechaSugerida.hour() < CONFIG_CITA.HORA_INICIO) {
                fechaSugerida = fechaSugerida.hour(CONFIG_CITA.HORA_INICIO);
            }

            if (fechaSugerida.hour() >= CONFIG_CITA.HORA_FIN) {
                fechaSugerida = fechaSugerida.add(1, "day").hour(CONFIG_CITA.HORA_INICIO);
                continue;
            }

            // Consulta de disponibilidad
            const existe = await this.incidenciaService.buscarPorFecha(fechaSugerida.toDate());

            if (!existe) {
                return fechaSugerida.format(Constantes.FORMATO_FECHA);
            }

            fechaSugerida = fechaSugerida.add(1, "hour");
        }

        throw new Error(`Cupo completo: No hay disponibilidad en los próximos ${CONFIG_CITA.MAX_DIAS} días.`);
    }
