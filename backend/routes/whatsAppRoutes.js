import express from 'express';

import {
    configurarTokenWhatsApp,
    receiveMessage
} from '../controllers/whatsAppController.js';

const router = express.Router();


router.get('/whatsApp', configurarTokenWhatsApp)
router.post('/whatsApp', receiveMessage);

export default router;

