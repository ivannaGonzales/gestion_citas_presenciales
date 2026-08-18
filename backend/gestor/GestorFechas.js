import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { Constantes } from "../constantes/Constantes.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const CONFIG_CITA = {
    HORA_INICIO: 8,
    HORA_FIN: 20,
    MAX_DIAS: 30
};

/**
 * Servicio encargado de gestionar y resolver fechas disponibles para citas presenciales.
 */
class GestorFechas {
    /**
     * Crea un gestor de fechas.
     * @param {Object} params Dependencias del gestor.
     */
    constructor({ mensajeService }) {
        this.mensajeService = mensajeService;
    }


    /**
     * Resuelve una fecha en función del tipo de mensaje y la respuesta del usuario
     * Si el mensaje es un botón afirmativo, se busca directamente una fecha disponible
     * Si es texto, se intenta reconstruir la fecha a partir de la conversación previa.
     * @param {Object} params Parámetros de la conversación.
     * @param {string} params.incidenciaId Identificador de la incidencia.
     * @param {string} params.respuesta Texto enviado por el usuario.
     * @param {string} params.tipoMensaje Tipo de mensaje recibido.
     * @param {Function} params.esFechaOcupada Función para verificar disponibilidad.
     * @returns {Promise<string|null>} Fecha formateada o null si no se pudo resolver.
     */
    async resolverFechaConversacional({ incidenciaId, respuesta, tipoMensaje = "text", esFechaOcupada }) {
        const respuestaNormalizada = respuesta?.trim().toLowerCase();
        const esAfirmativa = respuestaNormalizada === Constantes.RESPUESTA_AFIRMATIVA.toLowerCase();
        if (tipoMensaje === Constantes.TIPO_MENSAJE_BUTTON && esAfirmativa) {
            return this.buscarFechaDisponible(esFechaOcupada);//busca la primera fecha dentro del rango permitido claro porque tu ya le enviaste una fecha 
        }

        return this.#reconstruirFechaDesdeConversacion(incidenciaId);
    }

    /**
     * Busca la primera fecha disponible dentro del rango permitido.
     * @param {Function} esFechaOcupada Función que indica si una fecha está ocupada por otra incidencia registrada.
     * @returns {Promise<string|null>} Fecha disponible formateada o null si no se encontró.
     */
    async buscarFechaDisponible(esFechaOcupada) {
        const fechaLimite = dayjs.utc().add(CONFIG_CITA.MAX_DIAS, Constantes.DAY);
        let fechaSugerida = dayjs.utc().add(1, Constantes.HOUR).startOf(Constantes.HOUR);
        let fechaEncontrada = null;

        while (fechaSugerida.isBefore(fechaLimite) && !fechaEncontrada) {
            const fechaPermitida = this.#ajustarAlHorarioPermitido(fechaSugerida);

            if (fechaPermitida) {
                const existe = esFechaOcupada ? await esFechaOcupada(fechaPermitida.toDate()) : false;

                if (!existe) {
                    fechaEncontrada = fechaPermitida.format(Constantes.FORMATO_FECHA);
                } else {
                    fechaSugerida = fechaPermitida.add(1, Constantes.HOUR);
                }
            } else {
                fechaSugerida = fechaSugerida.add(1, Constantes.HOUR);
            }
        }

        return fechaEncontrada;
    }

    /**
     * Verifica si una fecha está disponible.
     * @param {Date|string} fecha Fecha a validar.
     * @param {Function} esFechaOcupada Función que indica si la fecha está ocupada.
     * @returns {Promise<boolean>} `true` si está disponible, `false` si está ocupada.
     */
    async estaFechaDisponible(fecha, esFechaOcupada) {
        const existe = esFechaOcupada ? await esFechaOcupada(fecha) : false;
        return !existe;
    }

    /**
     * Ajusta la fecha sugerida al horario permitido.
     * @param {dayjs.Dayjs} fechaSugerida Fecha candidata.
     * @returns {dayjs.Dayjs} Fecha ajustada.
     */
    /*#ajustarAlHorarioPermitido(fechaSugerida) {
        if (fechaSugerida.hour() < CONFIG_CITA.HORA_INICIO) {
            return fechaSugerida.hour(CONFIG_CITA.HORA_INICIO);
        }

        if (fechaSugerida.hour() >= CONFIG_CITA.HORA_FIN) {
            return fechaSugerida.add(1, "day").hour(CONFIG_CITA.HORA_INICIO);
        }

        return fechaSugerida;
    }*/

    /**
    * Ajusta la fecha sugerida al horario permitido.
    * @param {dayjs.Dayjs} fechaSugerida Fecha candidata.
    * @returns {dayjs.Dayjs} Fecha ajustada.
    */
    #ajustarAlHorarioPermitido(fechaSugerida) {
        let fechaPermitida = fechaSugerida;

        if (this.#esFinDeSemana(fechaPermitida)) {
            return this.#moverAlSiguienteDiaLaborable(fechaPermitida);
        }

        if (fechaPermitida.hour() < CONFIG_CITA.HORA_INICIO) {
            return fechaPermitida
                .hour(CONFIG_CITA.HORA_INICIO)
                .minute(0)
                .second(0)
                .millisecond(0);
        }

        if (fechaPermitida.hour() >= CONFIG_CITA.HORA_FIN) {
            return this.#moverAlSiguienteDiaLaborable(
                fechaPermitida.add(1, Constantes.DAY)
            );
        }

        return fechaPermitida;
    }

    #esFinDeSemana(fecha) {
        return fecha.day() === Constantes.DIA_DOMINGO || fecha.day() === Constantes.DIA_SABADO;
    }

    #moverAlSiguienteDiaLaborable(fecha) {
        let fechaLaborable = fecha
            .hour(CONFIG_CITA.HORA_INICIO)
            .minute(0)
            .second(0)
            .millisecond(0);

        while (this.#esFinDeSemana(fechaLaborable)) {
            fechaLaborable = fechaLaborable.add(1, "day");
        }

        return fechaLaborable;
    }

    /**
     * Reconstruye una fecha completa a partir de los mensajes de la conversación.
     * @param {string} incidenciaId Identificador de la incidencia.
     * @returns {Promise<string|null>} Fecha formateada o null si no se pudo reconstruir.
     */
    async #reconstruirFechaDesdeConversacion(incidenciaId) {
        const mensajes = await this.mensajeService.obtenerMensajesPorIncidencia(incidenciaId);

        const infoFecha = mensajes.reduce((acumulado, mensaje) => {
            const fechaParseada = mensaje.fecha_parseada;


            if (!fechaParseada) {
                return acumulado;
            }

            return {
                dia: fechaParseada.tipo === Constantes.TIPO_FECHA_HORA
                    ? acumulado.dia
                    : fechaParseada.fecha,
                hora: fechaParseada.tipo === Constantes.TIPO_FECHA_DIA
                    ? acumulado.hora
                    : fechaParseada.fecha
            };
        }, { dia: null, hora: null });

        if (!infoFecha.dia || !infoFecha.hora) {
            return null;
        }

        const dia = dayjs(infoFecha.dia).tz(Constantes.ZONA_HORARIA).format(Constantes.FORMATO_DIA);
        const hora = dayjs(infoFecha.hora).tz(Constantes.ZONA_HORARIA).format(Constantes.FORMATO_HORA);


        return dayjs.utc(`${dia}T${hora}`).format(Constantes.FORMATO_FECHA);
    }
}

export { GestorFechas };
