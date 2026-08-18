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
    incidenciasConLegacyAntes: 0,
    incidenciasLimpiadas: 0,
    mensajesConTelefonoAntes: 0,
    mensajesLimpiados: 0,
    fechasHuerfanasAntes: 0,
    fechasHuerfanasEliminadas: 0
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

async function limpiarIncidencias() {
    const filtroLegacy = {
        $or: [
            { usuario: { $exists: true } },
            { empresa: { $exists: true } },
            { asignadoA: { $exists: true } }
        ]
    };

    stats.incidenciasConLegacyAntes = await Incidencia.countDocuments(filtroLegacy);

    if (!isDryRun && stats.incidenciasConLegacyAntes > 0) {
        const resultado = await Incidencia.updateMany(
            filtroLegacy,
            {
                $unset: {
                    usuario: "",
                    empresa: "",
                    asignadoA: ""
                }
            }
        );

        stats.incidenciasLimpiadas = resultado.modifiedCount ?? 0;
    }
}

async function limpiarMensajes() {
    const filtroTelefono = { telefono: { $exists: true } };
    stats.mensajesConTelefonoAntes = await Mensaje.countDocuments(filtroTelefono);

    if (!isDryRun && stats.mensajesConTelefonoAntes > 0) {
        const resultado = await Mensaje.updateMany(
            filtroTelefono,
            {
                $unset: {
                    telefono: ""
                }
            }
        );

        stats.mensajesLimpiados = resultado.modifiedCount ?? 0;
    }
}

async function limpiarFechasHuerfanas() {
    const filtroHuerfanas = {
        $or: [
            { mensaje: { $exists: false } },
            { mensaje: null }
        ]
    };

    stats.fechasHuerfanasAntes = await FechaParseada.countDocuments(filtroHuerfanas);

    if (!isDryRun && stats.fechasHuerfanasAntes > 0) {
        const resultado = await FechaParseada.deleteMany(filtroHuerfanas);
        stats.fechasHuerfanasEliminadas = resultado.deletedCount ?? 0;
    }
}

async function main() {
    await mongoose.connect(mongoUri);

    try {
        console.log(`Base de datos destino: ${describirConexionMongo(mongoUri)}`);
        console.log(
            isDryRun
                ? "Ejecutando limpieza final del modelo en modo simulacion (--dry-run)..."
                : "Ejecutando limpieza final del modelo..."
        );

        await limpiarIncidencias();
        await limpiarMensajes();
        await limpiarFechasHuerfanas();

        console.log("Limpieza finalizada.");
        console.table(stats);
    } finally {
        await mongoose.disconnect();
    }
}

const executedDirectly = process.argv[1]
    && import.meta.url === pathToFileURL(process.argv[1]).href;

if (executedDirectly) {
    main().catch(async (error) => {
        console.error("Error durante la limpieza:", error);
        await mongoose.disconnect();
        process.exit(1);
    });
}

export { main };
