import { CoordinadorCita } from "../coordinador/CoordinadorCita.js";
import { GestorCita } from "../gestor/GestorCita.js";
import { GestorConversacion } from "../gestor/GestorConversacion.js";
import { GestorFechas } from "../gestor/GestorFechas.js";
import { GestorMensajes } from "../gestor/GestorMensajes.js";
import { IniciarConversacionCita } from "../application/operaciones-cita/IniciarConversacionCita.js";
import { ProcesarRespuestaCita } from "../application/operaciones-cita/ProcesarRespuestaCita.js";
import { FechaParseadaService } from "../services/FechaParseadaService.js";
import { IncidenciaService } from "../services/IncidenciaService.js";
import { MensajeService } from "../services/MensajeService.js";
import { UsuarioService } from "../services/UsuarioService.js";
import { IncidenciaRepository } from "../repositories/IncidenciaRepository.js";
import { MensajeRepository } from "../repositories/MensajeRepository.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";

export function crearCoordinadorCita({ facebookClient, parserClient, iaClient }) {
    const incidenciaRepository = new IncidenciaRepository();
    const mensajeRepository = new MensajeRepository();
    const usuarioRepository = new UsuarioRepository();

    const incidenciaService = new IncidenciaService(incidenciaRepository);
    const mensajeService = new MensajeService(mensajeRepository);
    const usuarioService = new UsuarioService(usuarioRepository);
    const fechaParseadaService = new FechaParseadaService(parserClient);

    const gestorFechas = new GestorFechas({ mensajeService });
    const gestorMensajes = new GestorMensajes({ facebookClient, usuarioService });
    const gestorConversacion = new GestorConversacion({
        mensajeService,
        fechaParseadaService
    });
    const gestorCita = new GestorCita({
        incidenciaService,
        gestorFechas,
        gestorMensajes,
        gestorConversacion,
        iaClient
    });

    const iniciarConversacionCita = new IniciarConversacionCita({
        gestorCita
    });

    const procesarRespuestaCita = new ProcesarRespuestaCita({
        gestorCita
    });

    return new CoordinadorCita({
        iniciarConversacionCita,
        procesarRespuestaCita
    });
}
