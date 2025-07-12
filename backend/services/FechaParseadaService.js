

import FechaParseada from "../models/FechaParseada.js";

class FechaParseadaService {

    constructor() {

    }

    async crearFechaParseada(fecha, tipo) {
        const nuevaFecha = new FechaParseada({
            fecha: fecha,
            tipo: tipo
        });

        await nuevaFecha.save();
    }
}

export { FechaParseadaService };
