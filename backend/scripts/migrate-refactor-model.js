import dotenv from "dotenv";
import mongoose from "mongoose";
import { pathToFileURL } from "url";

import Incidencia from "../models/Incidencia.js";
import Mensaje from "../models/Mensaje.js";
import FechaParseada from "../models/FechaParseada.js";

dotenv.config();

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");
const mongoUri = process.env.MIGRATION_MONGO_URI || process.env.MONGO_URI;

if (!mongoUri) {
    console.error("Falta la variable de entorno MONGO_URI o MIGRATION_MONGO_URI.");
    process.exit(1);
}

const stats = {
    incidenciasActualizadas: 0,
    mensajesActualizados: 0,
    fechasParseadasActualizadas: 0,
    incidenciasSinTelefono: 0,
    fechasSinMensajeOrigen: 0
};

function normalizarTelefono(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return null;
    }

    return String(valor).trim();
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

async function obtenerTelefonoIncidencia(incidenciaId) {
    const mensaje = await Mensaje.findOne({
        incidencia: incidenciaId,
        telefono: { $ne: null }
    })
        .sort({ createdAt: 1 })
        .select("telefono")
        .lean();

    return normalizarTelefono(mensaje?.telefono);
}

async function migrarIncidencias() {
    const incidencias = await Incidencia.find({
        $or: [
            { telefonoContacto: { $exists: false } },
            { telefonoContacto: null },
            { telefonoContacto: "" }
        ]
    })
        .select("_id telefonoContacto")
        .lean();

    for (const incidencia of incidencias) {
        const telefonoContacto = await obtenerTelefonoIncidencia(incidencia._id);

        if (!telefonoContacto) {
            stats.incidenciasSinTelefono += 1;
            continue;
        }

        stats.incidenciasActualizadas += 1;

        if (!isDryRun) {
            await Incidencia.updateOne(
                { _id: incidencia._id },
                { $set: { telefonoContacto } }
            );
        }
    }
}

async function migrarMensajes() {
    const mensajes = await Mensaje.find({
        $or: [
            { emisor: { $exists: false } },
            { emisor: null },
            { emisor: "" }
        ]
    })
        .select("_id telefono")
        .lean();

    for (const mensaje of mensajes) {
        const telefono = normalizarTelefono(mensaje.telefono);
        const emisor = telefono ? "cliente" : "sistema";

        stats.mensajesActualizados += 1;

        if (!isDryRun) {
            await Mensaje.updateOne(
                { _id: mensaje._id },
                { $set: { emisor } }
            );
        }
    }
}

async function migrarFechasParseadas() {
    const mensajesConFecha = await Mensaje.find({
        fechaParseada: { $ne: null }
    })
        .select("_id fechaParseada contenido")
        .lean();

    for (const mensaje of mensajesConFecha) {
        const fechaParseada = await FechaParseada.findById(mensaje.fechaParseada)
            .select("_id mensaje textoOriginal")
            .lean();

        if (!fechaParseada) {
            continue;
        }

        const update = {};

        if (!fechaParseada.mensaje) {
            update.mensaje = mensaje._id;
        }

        if (!fechaParseada.textoOriginal && mensaje.contenido) {
            update.textoOriginal = mensaje.contenido;
        }

        if (Object.keys(update).length === 0) {
            continue;
        }

        stats.fechasParseadasActualizadas += 1;

        if (!isDryRun) {
            await FechaParseada.updateOne(
                { _id: fechaParseada._id },
                { $set: update }
            );
        }
    }

    const fechasHuerfanas = await FechaParseada.countDocuments({
        $or: [
            { mensaje: { $exists: false } },
            { mensaje: null }
        ]
    });

    stats.fechasSinMensajeOrigen = fechasHuerfanas;
}

async function main() {
    await mongoose.connect(mongoUri);

    try {
        console.log(`Base de datos destino: ${describirConexionMongo(mongoUri)}`);
        console.log(
            isDryRun
                ? "Ejecutando migracion en modo simulacion (--dry-run)..."
                : "Ejecutando migracion del modelo refactorizado..."
        );

        await migrarIncidencias();
        await migrarMensajes();
        await migrarFechasParseadas();

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
