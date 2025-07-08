import moment from "moment";
import mongoose from "mongoose";
import Incidencia from "../models/Incidencia.js";

const uri = "mongodb+srv://gonzalesivanna8:BYseQe5Lth08uKni@cluster0.ap41x.mongodb.net/gestion_citas_presenciales?retryWrites=true&w=majority&appName=Cluster0";

const nombres = ["Maje", "Carlos", "Luisa"];
const telefonos = [34625958554, 34625958555, 34625958556];
const fechasCreadas = [];

(async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Conectado a MongoDB Atlas");

        const hoy = moment().startOf('day')
        const horarioCita = 15; // que las citas sean a las 3 de manera autmatica

        // Día de la prueba inicial 
        let baseFecha = moment(hoy).hour(horarioCita);
        console.log('baseFecha ', baseFecha)
        const horasOcupadas = [0, 1, 3]; // 16:00, 17:00, 19:00 UTC

        for (let i = 0; i < horasOcupadas.length; i++) {
            const fecha = moment(baseFecha)
                .add(horasOcupadas[i], "hours")
                .utcOffset(0, true)
                .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

            fechasCreadas.push(fecha);

            const nuevoIncidencia = new Incidencia({
                nombre: nombres[i],
                motivo: "Cambio de router",
                numero: telefonos[i],
                resuelta: false,
                fecha: fecha
            });
            await nuevoIncidencia.save();
        }

        const sugerida = await obtenerFechaCitaInicial();
        console.log("📅 Fecha sugerida:", sugerida);

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        // Limpieza de incidencias creadas
        await Incidencia.deleteMany({
            numero: { $in: telefonos },
            fecha: { $in: fechasCreadas }
        });

        await mongoose.disconnect();
        console.log("🧹 Limpieza completada y desconectado de MongoDB.");
    }
})();
