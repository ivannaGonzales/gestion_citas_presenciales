import express from 'express';

import {
    configurarTokenWhatsApp,
    enviarConfirmacionCitaWhatsApp,
    enviarMensaje,
    politicas,
    receiveMessage
} from '../controllers/whatsAppController.js';

const router = express.Router();


router.get('/whatsApp', configurarTokenWhatsApp)
router.post('/whatsApp', receiveMessage);
router.post('/enviarMensaje', enviarMensaje)
router.get('/politicas', politicas)
router.post('/confirmacion', enviarConfirmacionCitaWhatsApp)

export default router;

