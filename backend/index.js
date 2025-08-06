import dotenv from "dotenv";
import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import whatsAppRoutes from './routes/whatsAppRoutes.js';

const app = express();

app.use(express.json())

dotenv.config();

//
const uri = "mongodb+srv://gonzalesivanna8:BYseQe5Lth08uKni@cluster0.ap41x.mongodb.net/gestion_citas_presenciales?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("gestion_citas_presenciales").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const db = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

// Obtener la ruta del archivo actual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del servidor estático
app.use(express.static(
    path.resolve(__dirname, 'public')
));

//conectarDB();
//sssssssss

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
app.use("/api/gestion_citas_presenciales", whatsAppRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`)
})