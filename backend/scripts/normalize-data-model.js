import dotenv from "dotenv";
import mongoose from "mongoose";
import { pathToFileURL } from "url";

import FechaParseada from "../models/FechaParseada.js";
import Incidencia from "../models/Incidencia.js";
import Mensaje from "../models/Mensaje.js";

dotenv.config();

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");
const mongoUri = process.env.MIGRATION_MONGO_URI || process.env.MONGO_URI;
console.log("mongoUri " + mongoUri);

if (!mongoUri) {
    console.error("Falta la variable de entorno MONGO_URI o MIGRATION_MONGO_URI.");
    process.exit(1);
}

const stats = {
    incidenciasNormalizadas: 0,
    telefonosGenerados: 0,
    camposLegacyEliminados: 0,
    mensajesNormalizados: 0,
    fechasParseadasNormalizadas: 0,
    incidenciasYaCorrectas: 0,
    mensajesYaCorrectos: 0,
    fechasParseadasYaCorrectas: 0
};

function normalizarTelefono(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return null;
    }

    return String(valor).replace(/\s+/g, "").trim();
}

function describirConexionMongo(uri) {
    try {
        const parsed = new URL(uri);
        const dbName = parsed.pathname?.replace("/", "") || "(sin base)";
        return `${parsed.hostname}/${dbName}`;
    } catch {
        return "uri-no-legible";
    }
}

function generarTelefonoPrueba(indice) {
    return `600${String(indice).padStart(6, "0")}`;
}

async function obtenerTelefonoExistente(incidencia) {
    const telefonoIncidencia = normalizarTelefono(incidencia.telefonoContacto);
    if (telefonoIncidencia) {
        return telefonoIncidencia;
    }

    const mensaje = await Mensaje.findOne({
        incidencia: incidencia._id,
        telefono: { $ne: null }
    })
        .sort({ createdAt: 1 })
        .select("telefono")
        .lean();

    return normalizarTelefono(mensaje?.telefono);
}

async function cargarTelefonosYaUsados() {
    const incidencias = await Incidencia.find({
        telefonoContacto: { $exists: true, $ne: null }
    })
        .select("telefonoContacto")
        .lean();

    return new Set(
        incidencias
            .map((incidencia) => normalizarTelefono(incidencia.telefonoContacto))
            .filter(Boolean)
    );
}

function generarTelefonoDisponible(telefonosUsados) {
    let indice = 1;
    let candidato = generarTelefonoPrueba(indice);

    while (telefonosUsados.has(candidato)) {
        indice += 1;
        candidato = generarTelefonoPrueba(indice);
    }

    telefonosUsados.add(candidato);
    return candidato;
}

async function normalizarIncidencias() {
    const incidencias = await Incidencia.collection.find({}).toArray();

    const telefonosUsados = await cargarTelefonosYaUsados();

    for (const incidencia of incidencias) {
        let telefonoContacto = await obtenerTelefonoExistente(incidencia);
        let telefonoGenerado = false;

        if (!telefonoContacto) {
            telefonoContacto = generarTelefonoDisponible(telefonosUsados);
            telefonoGenerado = true;
        }

        const cambios = {};
        const unset = {};
        if (normalizarTelefono(incidencia.telefonoContacto) !== telefonoContacto) {
            cambios.telefonoContacto = telefonoContacto;
        }

        for (const legacyField of ["usuario", "empresa", "asignadoA"]) {
            if (Object.prototype.hasOwnProperty.call(incidencia, legacyField)) {
                unset[legacyField] = "";
            }
        }

        if (Object.keys(cambios).length === 0 && Object.keys(unset).length === 0) {
            stats.incidenciasYaCorrectas += 1;
            continue;
        }

        stats.incidenciasNormalizadas += 1;
        if (telefonoGenerado) {
            stats.telefonosGenerados += 1;
        }
        if (Object.keys(unset).length > 0) {
            stats.camposLegacyEliminados += 1;
        }

        if (!isDryRun) {
            const update = {};
            if (Object.keys(cambios).length > 0) {
                update.$set = cambios;
            }
            if (Object.keys(unset).length > 0) {
                update.$unset = unset;
            }

            await Incidencia.updateOne({ _id: incidencia._id }, update);
        }
    }
}

async function normalizarMensajes() {
    const mensajes = await Mensaje.find({})
        .select("_id telefono emisor incidencia")
        .lean();

    for (const mensaje of mensajes) {
        const telefono = normalizarTelefono(mensaje.telefono);
        const emisorEsperado = telefono ? "cliente" : "sistema";
        const cambios = {};

        if (!mensaje.emisor || mensaje.emisor !== emisorEsperado) {
            cambios.emisor = emisorEsperado;
        }

        if (Object.keys(cambios).length === 0) {
            stats.mensajesYaCorrectos += 1;
            continue;
        }

        stats.mensajesNormalizados += 1;

        if (!isDryRun) {
            await Mensaje.updateOne({ _id: mensaje._id }, { $set: cambios });
        }
    }
}

async function normalizarFechasParseadas() {
    const mensajesConFecha = await Mensaje.find({
        fechaParseada: { $ne: null }
    })
        .select("_id fechaParseada contenido")
        .lean();

    const mensajesPorFecha = new Map();
    for (const mensaje of mensajesConFecha) {
        mensajesPorFecha.set(String(mensaje.fechaParseada), mensaje);
    }

    const fechas = await FechaParseada.find({}).select("_id mensaje textoOriginal").lean();

    for (const fecha of fechas) {
        const mensajeOrigen = mensajesPorFecha.get(String(fecha._id));
        const cambios = {};

        if (!fecha.mensaje && mensajeOrigen?._id) {
            cambios.mensaje = mensajeOrigen._id;
        }

        if (!fecha.textoOriginal && mensajeOrigen?.contenido) {
            cambios.textoOriginal = mensajeOrigen.contenido;
        }

        if (Object.keys(cambios).length === 0) {
            stats.fechasParseadasYaCorrectas += 1;
            continue;
        }

        stats.fechasParseadasNormalizadas += 1;

        if (!isDryRun) {
            await FechaParseada.updateOne({ _id: fecha._id }, { $set: cambios });
        }
    }
}

async function main() {
    await mongoose.connect(mongoUri);

    try {
        console.log(`Base de datos destino: ${describirConexionMongo(mongoUri)}`);
        console.log(
            isDryRun
                ? "Ejecutando normalizacion en modo simulacion (--dry-run)..."
                : "Ejecutando normalizacion del modelo de datos..."
        );

        await normalizarIncidencias();
        await normalizarMensajes();
        await normalizarFechasParseadas();

        console.log("Normalizacion finalizada.");
        console.table(stats);
    } finally {
        await mongoose.disconnect();
    }
}

const executedDirectly = process.argv[1]
    && import.meta.url === pathToFileURL(process.argv[1]).href;

if (executedDirectly) {
    main().catch(async (error) => {
        console.error("Error durante la normalizacion:", error);
        await mongoose.disconnect();
        process.exit(1);
    });
}

export { main };
