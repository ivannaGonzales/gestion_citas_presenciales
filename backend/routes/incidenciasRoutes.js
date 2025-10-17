import express from 'express';

import {
    getIncidenciasEmpresa
} from '../controllers/incidenciasController.js';


const router = express.Router();

router.get('/incidencias/empresa/:empresaId', getIncidenciasEmpresa)


export default router;