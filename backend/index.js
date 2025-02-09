import dotenv from 'dotenv';
import express from "express";
import conectarDB from "./config/db.js";
import pacienteRoutes from './routes/pacienteRoutes.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import whatsAppRoutes from './routes/whatsAppRoutes.js';

const app = express();

app.use(express.json())

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //El origin del Request esta permitido
            callback(null, true)
        } else {
            callback(new Error('No permitido por cors'))
        }
    }
}

//app.use(cors(corsOptions));
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/gestion_credenciales", whatsAppRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`)
})