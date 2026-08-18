    async enviarCitaPresencial(incidencia, fecha) {
        const { fechaFormat: fechaFormat, horaFormat: horaFormat } = this.formatearFecha(fecha);
        const usuario = await Usuario.findById(incidencia.usuario);
        const mensaje = {
            "messaging_product": "whatsapp",
            "to": usuario.telefono,//aqui hay que tener cuidado porque le estoy pasando un número fijo 
            "type": "template",
            "template": {
                "name": "gestion_citas_presenciales",
                "language": {
                    "code": "es"
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            {
                                "parameter_name": "nombre",
                                "type": "text",
                                "text": usuario.nombre
                            },
                            {
                                "parameter_name": "motivo",
                                "type": "text",
                                "text": incidencia.motivo
                            },
                            {
                                "parameter_name": "fecha",
                                "type": "text",
                                "text": fechaFormat
                            },
                            {
                                "parameter_name": "hora",
                                "type": "text",
                                "text": horaFormat
                            }
                        ]
                    }
                ]
            }
        }
        await this.facebookClient.llamadaServicio(mensaje)
    }
