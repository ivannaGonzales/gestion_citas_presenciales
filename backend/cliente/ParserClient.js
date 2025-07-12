

import axios from 'axios';
import { Constantes } from '../constantes/Constantes.js';


class ParserClient {

    constructor() {
        this.baseURL = 'https://appgestioncitas.azurewebsites.net';
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
    }


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

