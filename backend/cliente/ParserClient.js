

import axios from 'axios';
import { Constantes } from '../constantes/Constantes.js';

/**
 * Cliente que se encarga de llamar a la herramienta 
 * Duckling desarrollada por Facebook que permite extraer
 * entidades de tipo fecha desde un texto en lenguaje natural.
 */
class ParserClient {
    /**
     * Constructor del cliente Duckling
     * @constructor
     */
    constructor() {
        /** Url base del API de Duckling
         * @type {String}
         */
        this.baseURL = 'https://appgestioncitas.azurewebsites.net';
        /**
         * Encabezados HTTP
         * Content-Type @type {String}
         */
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
    }

    /**
     * Realiza la llamada al cliente Duckling
     * @param {String} respuesta Respuesta del usuario y del cual se va a extraer la fecha 
     * de manera estructurada para guardarla en base de datos
     * @returns Respuesta del cliente Duckling
     */
    async parsearFecha(respuesta) {
        const body = new URLSearchParams();
        body.append(Constantes.TEXT, respuesta);
        body.append(Constantes.LANG, Constantes.IDIOMA);
        const response = await axios.post(
            `${this.baseURL}/parse`,
            body.toString(),
            { headers: this.headers }
        );
        return response.data;
    }
}
export { ParserClient };

