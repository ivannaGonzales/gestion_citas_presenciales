    async enviarMensaje() {
        const incidenciaAbierta = await this.incidenciaService.obtenerIncidenciaActiva();
        const fechaCitaInicial = await this.gestorFechas.buscarFechaDisponible();
        await this.gestorMensajes.enviarCitaPresencial(incidenciaAbierta, fechaCitaInicial)
    }
