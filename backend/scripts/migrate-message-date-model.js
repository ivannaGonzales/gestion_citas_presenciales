import dotenv from "dotenv";
import mongoose from "mongoose";
import { pathToFileURL } from "url";

import FechaParseada from "../models/FechaParseada.js";
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
    mensajesActualizados: 0,
    telefonosEliminados: 0,
    emisoresNormalizados: 0,
    referenciasMensajeAFecha: 0,
    referenciasFechaAMensaje: 0,
    textosOriginalesCompletados: 0,
    mensajesYaCorrectos: 0,
    fechasYaCorrectas: 0
};

function describirConexionMongo(uri) {
    try {
        const parsed = new URL(uri);
        const dbName = parsed.pathname?.replace("/", "") || "(sin base)";
        return `${parsed.hostname}/${dbName}`;
    } catch {
        return "uri-no-legible";
    }
}

function normalizarTelefono(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return null;
    }

    return String(valor).replace(/\s+/g, "").trim();
}

async function normalizarMensajes() {
    const mensajes = await Mensaje.collection.find({}).toArray();

    for (const mensaje of mensajes) {
        const telefono = normalizarTelefono(mensaje.telefono);
        const emisorEsperado = mensaje.emisor || (telefono ? "cliente" : "sistema");
        const set = {};
        const unset = {};

        if (!mensaje.emisor || mensaje.emisor !== emisorEsperado) {
            set.emisor = emisorEsperado;
            stats.emisoresNormalizados += 1;
        }

        if (Object.prototype.hasOwnProperty.call(mensaje, "telefono")) {
            unset.telefono = "";
            stats.telefonosEliminados += 1;
        }

        if (Object.keys(set).length === 0 && Object.keys(unset).length === 0) {
            stats.mensajesYaCorrectos += 1;
            continue;
        }

        stats.mensajesActualizados += 1;

        if (!isDryRun) {
            const update = {};
            if (Object.keys(set).length > 0) {
                update.$set = set;
            }
            if (Object.keys(unset).length > 0) {
                update.$unset = unset;
            }

            await Mensaje.updateOne({ _id: mensaje._id }, update);
        }
    }
}

async function normalizarReferenciasFechaParseada() {
    const mensajes = await Mensaje.find({
        fechaParseada: { $ne: null }
    })
        .select("_id fechaParseada contenido")
        .lean();

    const fechaPorId = new Map();
    const fechas = await FechaParseada.find({})
        .select("_id mensaje textoOriginal")
        .lean();

    for (const fecha of fechas) {
        fechaPorId.set(String(fecha._id), fecha);
    }

    for (const mensaje of mensajes) {
        const fecha = fechaPorId.get(String(mensaje.fechaParseada));
        if (!fecha) {
            continue;
        }

        const cambios = {};

        if (!fecha.mensaje) {
            cambios.mensaje = mensaje._id;
            stats.referenciasFechaAMensaje += 1;
        }

        if (!fecha.textoOriginal && mensaje.contenido) {
            cambios.textoOriginal = mensaje.contenido;
            stats.textosOriginalesCompletados += 1;
        }

        if (Object.keys(cambios).length === 0) {
            stats.fechasYaCorrectas += 1;
            continue;
        }

        if (!isDryRun) {
            await FechaParseada.updateOne(
                { _id: fecha._id },
                { $set: cambios }
            );
        }
    }
}

async function normalizarReferenciasMensaje() {
    const fechas = await FechaParseada.find({
        mensaje: { $ne: null }
    })
        .select("_id mensaje")
        .lean();

    for (const fecha of fechas) {
        const mensaje = await Mensaje.findById(fecha.mensaje)
            .select("_id fechaParseada")
            .lean();

        if (!mensaje) {
            continue;
        }

        if (mensaje.fechaParseada && String(mensaje.fechaParseada) === String(fecha._id)) {
            continue;
        }

        stats.referenciasMensajeAFecha += 1;

        if (!isDryRun) {
            await Mensaje.updateOne(
                { _id: mensaje._id },
                { $set: { fechaParseada: fecha._id } }
            );
        }
    }
}

async function main() {
    await mongoose.connect(mongoUri);

    try {
        console.log(`Base de datos destino: ${describirConexionMongo(mongoUri)}`);
        console.log(
            isDryRun
                ? "Ejecutando migracion de Mensaje/FechaParseada en modo simulacion (--dry-run)..."
                : "Ejecutando migracion de Mensaje/FechaParseada..."
        );

        await normalizarMensajes();
        await normalizarReferenciasFechaParseada();
        await normalizarReferenciasMensaje();

        console.log("Migracion finalizada.");
        console.table(stats);
    } finally {
        await mongoose.disconnect();
    }
}

const executedDirectly = process.argv[1]
    && import.meta.url === pathToFileURL(process.argv[1]).href;

if (executedDirectly) {
    main().catch(async (error) => {
        console.error("Error durante la migracion:", error);
        await mongoose.disconnect();
        process.exit(1);
    });
}

export { main };
