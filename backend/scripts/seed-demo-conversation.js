import dotenv from "dotenv";
import mongoose from "mongoose";
import { pathToFileURL } from "url";

import Incidencia from "../models/Incidencia.js";
import Mensaje from "../models/Mensaje.js";
import FechaParseada from "../models/FechaParseada.js";

dotenv.config();

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");
const force = args.has("--force");
const mongoUri = process.env.MIGRATION_MONGO_URI || process.env.MONGO_URI;

if (!mongoUri) {
    console.error("Falta la variable de entorno MONGO_URI o MIGRATION_MONGO_URI.");
    process.exit(1);
}

const stats = {
    incidenciasProcesadas: 0,
    incidenciasSembradas: 0,
    incidenciasOmitidasPorMensajes: 0,
    mensajesCreados: 0,
    fechasParseadasCreadas: 0
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

function addDays(baseDate, days) {
    const result = new Date(baseDate);
    result.setDate(result.getDate() + days);
    return result;
}

function withTime(baseDate, hours, minutes = 0) {
    const result = new Date(baseDate);
    result.setHours(hours, minutes, 0, 0);
    return result;
}

function construirEscenario(incidencia, indice) {
    const hoy = new Date();
    const manana = addDays(hoy, 1);
    const pasado = addDays(hoy, 2);
    const fechaCompleta = withTime(manana, 10 + (indice % 4), 0);
    const fechaDia = pasado.toISOString().slice(0, 10);
    const fechaHora = `1970-01-01T${String(16 + (indice % 3)).padStart(2, "0")}:30:00.000Z`;
    const fechaISOCompleta = fechaCompleta.toISOString();

    const escenarios = [
        () => ({
            mensajes: [
                {
                    emisor: "sistema",
                    contenido: `Hola, te escribimos por la incidencia "${incidencia.motivo}". Tenemos disponibilidad para una cita presencial.`
                },
                {
                    emisor: "cliente",
                    contenido: `Sí, me viene bien mañana a las ${String(fechaCompleta.getHours()).padStart(2, "0")}:00.`,
                    fechaParseada: {
                        fecha: fechaISOCompleta,
                        tipo: "fecha_completa",
                        textoOriginal: `mañana a las ${String(fechaCompleta.getHours()).padStart(2, "0")}:00`
                    }
                },
                {
                    emisor: "sistema",
                    contenido: `Perfecto, dejamos anotada la visita para el ${fechaCompleta.toLocaleDateString("es-ES")} a las ${String(fechaCompleta.getHours()).padStart(2, "0")}:00.`
                }
            ]
        }),
        () => ({
            mensajes: [
                {
                    emisor: "sistema",
                    contenido: `Buenos días. Estamos revisando tu incidencia "${incidencia.motivo}" y necesitamos concretar la cita.`
                },
                {
                    emisor: "cliente",
                    contenido: "El martes podría atenderos.",
                    fechaParseada: {
                        fecha: fechaDia,
                        tipo: "dia",
                        textoOriginal: "El martes"
                    }
                },
                {
                    emisor: "cliente",
                    contenido: "Mejor a las 16:30.",
                    fechaParseada: {
                        fecha: fechaHora,
                        tipo: "hora",
                        textoOriginal: "a las 16:30"
                    }
                },
                {
                    emisor: "sistema",
                    contenido: "Perfecto, quedamos pendientes de esa franja para cerrar la visita."
                }
            ]
        }),
        () => ({
            mensajes: [
                {
                    emisor: "sistema",
                    contenido: `Hola, te contactamos por la incidencia "${incidencia.motivo}". ¿Qué horario te encaja mejor?`
                },
                {
                    emisor: "cliente",
                    contenido: "Por la tarde podría ser, sobre las 18:00.",
                    fechaParseada: {
                        fecha: `1970-01-01T18:00:00.000Z`,
                        tipo: "hora",
                        textoOriginal: "sobre las 18:00"
                    }
                },
                {
                    emisor: "sistema",
                    contenido: "Gracias, lo anotamos para proponerte una hora definitiva."
                }
            ]
        })
    ];

    return escenarios[indice % escenarios.length]();
}

async function crearMensajeConFecha(mensajeData, incidenciaId) {
    let fechaParseadaId = null;

    if (mensajeData.fechaParseada) {
        const fechaParseada = await FechaParseada.create({
            ...mensajeData.fechaParseada
        });
        fechaParseadaId = fechaParseada._id;
        stats.fechasParseadasCreadas += 1;
    }

    const mensaje = await Mensaje.create({
        contenido: mensajeData.contenido,
        incidencia: incidenciaId,
        fechaParseada: fechaParseadaId,
        emisor: mensajeData.emisor
    });

    stats.mensajesCreados += 1;

    if (fechaParseadaId) {
        await FechaParseada.updateOne(
            { _id: fechaParseadaId },
            { $set: { mensaje: mensaje._id } }
        );
    }
}

async function seed() {
    const incidencias = await Incidencia.find({})
        .select("_id motivo telefonoContacto")
        .sort({ createdAt: 1, _id: 1 })
        .lean();

    for (let indice = 0; indice < incidencias.length; indice += 1) {
        const incidencia = incidencias[indice];
        stats.incidenciasProcesadas += 1;

        const mensajesExistentes = await Mensaje.countDocuments({
            incidencia: incidencia._id
        });

        if (mensajesExistentes > 0 && !force) {
            stats.incidenciasOmitidasPorMensajes += 1;
            continue;
        }

        const escenario = construirEscenario(incidencia, indice);

        stats.incidenciasSembradas += 1;

        if (isDryRun) {
            stats.mensajesCreados += escenario.mensajes.length;
            stats.fechasParseadasCreadas += escenario.mensajes.filter((m) => m.fechaParseada).length;
            continue;
        }

        if (force && mensajesExistentes > 0) {
            const mensajes = await Mensaje.find({ incidencia: incidencia._id })
                .select("_id fechaParseada")
                .lean();

            const fechaIds = mensajes
                .map((mensaje) => mensaje.fechaParseada)
                .filter(Boolean);

            await Mensaje.deleteMany({ incidencia: incidencia._id });

            if (fechaIds.length > 0) {
                await FechaParseada.deleteMany({ _id: { $in: fechaIds } });
            }
        }

        for (const mensajeData of escenario.mensajes) {
            await crearMensajeConFecha(mensajeData, incidencia._id);
        }
    }
}

async function main() {
    await mongoose.connect(mongoUri);

    try {
        console.log(`Base de datos destino: ${describirConexionMongo(mongoUri)}`);
        console.log(
            isDryRun
                ? "Ejecutando seed de demo en modo simulacion (--dry-run)..."
                : "Ejecutando seed de conversaciones de demo..."
        );

        await seed();

        console.log("Seed finalizado.");
        console.table(stats);
    } finally {
        await mongoose.disconnect();
    }
}

const executedDirectly = process.argv[1]
    && import.meta.url === pathToFileURL(process.argv[1]).href;

if (executedDirectly) {
    main().catch(async (error) => {
        console.error("Error durante el seed:", error);
        await mongoose.disconnect();
        process.exit(1);
    });
}

export { main };
