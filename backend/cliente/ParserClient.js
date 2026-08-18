

import axios from 'axios';
import { Constantes } from '../constantes/Constantes.js';
import { ClienteIntegracion } from './ClienteIntegracion.js';

/**
 * Cliente que se encarga de llamar a la herramienta 
 * Duckling desarrollada por Facebook que permite extraer
 * entidades de tipo fecha desde un texto en lenguaje natural.
 */
class ParserClient extends ClienteIntegracion {
    /**
     * Constructor del cliente Duckling
     * @constructor
     */
    constructor() {
        super();
        /** Url base del API de Duckling
         * @type {String}
         */
        this.baseURL = 'https://duckling-gestion-citas-presenciales.azurewebsites.net';
        /**
         * Encabezados HTTP
         * Content-Type @type {String}
         */
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
    }

    /**
     * Devuelve el nombre del servicio integrado.
     * @returns {string}
     */
    getServiceName() {
        return "Duckling";
    }

    /**
     * Realiza la llamada al cliente Duckling
     * @param {string} usuarioRespuesta Texto del usuario.
     * @returns {Promise<Array>} Respuesta del cliente Duckling.
     */
    async parsearFecha(usuarioRespuesta) {
        try {

            const body = new URLSearchParams();
            body.append(Constantes.TEXT, usuarioRespuesta);
            body.append(Constantes.LANG, Constantes.IDIOMA);
            body.append(Constantes.TIMEZONE, Constantes.ZONA_HORARIA);

            const response = await axios.post(
                `${this.baseURL}/parse`,
                body.toString(),
                { headers: this.headers }
            );
            return response.data;

        } catch (err) {
            throw this.construirError("parsear la fecha", err);
        }
    }

}
export { ParserClient };
