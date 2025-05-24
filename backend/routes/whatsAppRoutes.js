import express from 'express';

import {
    configurarTokenWhatsApp,
    enviarConfirmacionCitaWhatsApp,
    enviarMensaje,
    politicas,
    prueba,
    receiveMessage
} from '../controllers/whatsAppController.js';

const router = express.Router();


router.get('/whatsApp', configurarTokenWhatsApp)
router.post('/whatsApp', receiveMessage);
router.post('/enviarMensaje', enviarMensaje)
router.get('/politicas', politicas)
router.post('/confirmacion', enviarConfirmacionCitaWhatsApp)
router.get('/prueba', prueba)

export default router;

