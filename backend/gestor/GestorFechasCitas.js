//import { MensajeService } from "..services/MensajeService.js";
import moment from "moment-timezone";
import { IncidenciaService } from "../services/InicidenciaService.js";
import { MensajeService } from "../services/MensajeService.js";

class GestorFechasCitas {

    static async obtenerFechaCitaInicial() {
        const hoy = moment.utc().startOf('day'); // usamos utc desde el inicio
        const horaInicio = 8;
        const horaFin = 20;
        const maxDias = 30;

        //primera fechaSugerida a las 3 de la tarde
        let fechaSugerida = moment(hoy).hour(15).minute(0).second(0).millisecond(0); // objeto moment
        for (let i = 0; i < maxDias; i++) {
            const existe = await IncidenciaService.buscarPorFechaSugerida(fechaSugerida)
            if (!existe) {
                return fechaSugerida.utcOffset(0).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
            }
            fechaSugerida.add(1, "hour");

            if (fechaSugerida.hour() >= horaFin) {
                fechaSugerida = moment(fechaSugerida).add(1, "day").hour(horaInicio).minute(0);
            }

        }

        return null;
    };


    static async analizarRespuesta() {
        // Asegurar que data es un array y tiene al menos dos elementos
        if (data != null) {
            let fecha = null; //la fecha
            let tipo = null; // hour, minute, day
            let primeraFecha = null;
            //me recorro para casos del tipo "el 7 de mayo quiero una cita"
            data.forEach(item => {
                if (item.value.values) {
                    primeraFecha = item.value.values[0];
                    fecha = primeraFecha.value;
                    tipo = primeraFecha.grain;
                }

            });
            return { fecha, tipo }
        } else {
            return null;
        }

    };

    static async parsearFecha(respuesta) {
        const body = new URLSearchParams();
        body.append('text', respuesta);
        body.append('lang', 'es');

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await axios.post('https://appgestioncitas.azurewebsites.net/parse', body.toString(), { headers });

        return await analizarRespuesta(response.data)

    };

    static async obtenerFecha(telefono) {
        const mensajes = await MensajeService.obtenerMensajes(telefono)
            .populate("fechaParseada")
            .sort({ createdAt: 1 })
            .filter(m => m.contenido.trim().toLowerCase() !== "no");

        for (let i = 0; i < mensajes.length; i++) {
            const actual = mensajes[i];
            const fechaActual = actual.fechaParseada;

            // Si es una fecha base tipo 'day' o 'week'
            if (fechaActual?.tipo === "day") {
                const baseDate = moment.parseZone(fechaActual.fecha).format("YYYY-MM-DD");

                // Buscar hacia adelante un complemento tipo 'hour' o 'minute'
                for (let j = i + 1; j < mensajes.length; j++) {
                    const siguiente = mensajes[j].fechaParseada;
                    if (siguiente?.tipo === "hour" || siguiente?.tipo === "minute") {
                        const hourPart = moment.parseZone(siguiente.fecha).utcOffset(0, true).format("HH:mm:ss.SSSZ");
                        const fechaUnificada = `${baseDate}T${hourPart}`;
                        return fechaUnificada;
                    }
                }
            }
        }

    }

    static async procesarMensaje(respuesta, telefono) {
        const mensaje = MensajeService.buscarPorContenidoYTelefono(respuesta, telefono)

        if (!mensaje) {
            console.log("No se encontró ningún mensaje con esos datos.");
            return;
        }

        const resultado = await this.parsearFecha(respuesta); // { fecha, tipo }

        const nuevaFecha = new FechaParseada({
            fecha: resultado.fecha,
            tipo: resultado.tipo
        });

        await nuevaFecha.save();
        mensaje.fechaParseada = nuevaFecha._id;
        await mensaje.save();
    };

    static async obtenerFechaCita(respuesta, telefono) {
        let fecha = null;
        try {
            await this.procesarMensaje(respuesta, telefono);
            fecha = await obtenerFecha(telefono);
        } catch (error) {
            console.log('error ', error)
        }
        return fecha;
    };
}

export { GestorFechasCitas };
