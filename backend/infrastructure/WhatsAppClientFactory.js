import { FacebookClient } from "../cliente/FacebookClient.js";
import { IAClient } from "../cliente/IAClient.js";
import { ParserClient } from "../cliente/ParserClient.js";

export function crearClientesWhatsApp() {
    return {
        facebookClient: new FacebookClient(),
        parserClient: new ParserClient(),
        iaClient: new IAClient()
    };
}

