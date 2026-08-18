import Usuario from "../models/Usuario.js";
import { RepositorioMongo } from "./RepositorioMongo.js";

class UsuarioRepository extends RepositorioMongo {
    constructor() {
        super(Usuario);
    }

    findOne(filtro) {
        return super.findOne(filtro);
    }
}

export { UsuarioRepository };
