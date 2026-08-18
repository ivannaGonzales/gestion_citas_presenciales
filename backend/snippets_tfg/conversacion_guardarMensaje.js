    async guardarMensaje(telefono, respuestaUsuario) {
        const texto = respuestaUsuario.trim().toLowerCase();

        if (texto == Constantes.PALABRA_NEGATIVA) {
            return null;
        }

        const usuario = await this.usuarioService.obtenerUsuarioPorTelefono(telefono);

        const incidencia = await this.incidenciaService.obtenerIncidenciaActiva(usuario._id);

        const fechaParseada = await this.fechaParseadaService.crearFecha(telefono, respuestaUsuario);
        return this.mensajeService.crearMensaje({
            telefono,
            respuestaUsuario,
            contenido: respuestaUsuario,
            incidencia: incidencia?._id,
            FechaParseada: fechaParseada
        })

