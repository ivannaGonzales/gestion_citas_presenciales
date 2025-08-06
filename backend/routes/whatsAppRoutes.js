import express from 'express';

import {
    configurarTokenWhatsApp,
    enviarMensaje,
    politicas,
    receiveMessage
} from '../controllers/whatsAppController.js';

const router = express.Router();


router.get('/whatsApp', configurarTokenWhatsApp)
router.post('/whatsApp', receiveMessage);
router.post('/enviarMensaje', enviarMensaje)
router.get('/politicas', politicas)

export default router;

