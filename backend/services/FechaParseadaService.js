import dayjs from "dayjs";
import { FechaTipoHelper } from "../helpers/FechaTipoHelper.js";


/**
 * Clase encargada de interpretar y convertir respuestas de usuario
 * en objetos de fecha válidos
 */
class FechaParseadaService {
    /**
     * Crea un servicio de parseo de fechas.
     * @param {Object} parserClient Cliente de parseo.
     */
    constructor(parserClient) {
        this.parserClient = parserClient;
    }

    /**
     * Procesa la respuesta del usuario y devuelve una fecha válida junto con su tipo.
     * 
     * El método intenta extraer una fecha desde el texto proporcionado. Si el cliente de parseo
     * no detecta ninguna fecha, o si el tipo de fecha es considerado inválido, se devuelve null
     * @param {String} usuarioRespuesta - String ingresado por el usuario
     * @returns {Objeto} { fecha: Date, tipo: "fecha_completa"}
     *
     * @example
     * // Resultado esperado:
     * // {
     * //   fecha: 2026-08-12T11:00:00.000+00:00,
     * //   tipo: "fecha_completa" | "dia" | "hora"
     * // }
     */
    async crearFecha(usuarioRespuesta) {
        const fechaClient = await this.parserClient.parsearFecha(usuarioRespuesta);

        if (!fechaClient?.length) {
            return null;
        }

        const { fecha, tipo } = FechaTipoHelper.extraerFechaTipo(fechaClient, usuarioRespuesta);



        console.log("fecha " + fecha)
        console.log("tipo " + tipo)
        if (!fecha || tipo === "sin_fecha") {
            return null;
        }

        return {
            fecha: dayjs(fecha).toDate(),
            tipo
        };
    }
}

export { FechaParseadaService };
