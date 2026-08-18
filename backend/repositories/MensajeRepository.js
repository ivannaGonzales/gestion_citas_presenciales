import { RepositorioMongo } from "./RepositorioMongo.js";
import Mensaje from "../models/Mensaje.js";

class MensajeRepository extends RepositorioMongo {
    constructor() {
        super(Mensaje);
    }

    findByIncidencia(incidenciaId) {
        return this.find({ incidencia: incidenciaId });
    }

}
export { MensajeRepository };
