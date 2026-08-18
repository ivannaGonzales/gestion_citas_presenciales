import { RepositorioMongo } from "./RepositorioMongo.js";
import Incidencia from "../models/Incidencia.js";

class IncidenciaRepository extends RepositorioMongo {
    constructor() {
        super(Incidencia);
    }

    /**
     * Busca una incidencia por filtro genérico
     */
    findOne(filtro) {
        return super.findOne(filtro);
    }

    /**
     * Busca varias incidencias por filtro
     */
    find(filtro) {
        return super.find(filtro);
    }

    /**
     * Actualiza una incidencia
     */
    update(id, data) {
        return super.update(id, data);
    }

    /**
     * Actualiza una incidencia por filtro
     */
    updateOne(filter, data) {
        return super.updateOne(filter, data);
    }
}

export { IncidenciaRepository };
