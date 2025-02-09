import express from 'express';
import {
    autenticar, comprobarToken,
    confirmar, nuevoPassword,
    olvidePassword, perfil, registrar
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();


//area publica
router.post('/', registrar)


router.get("/confirmar/:token", confirmar)

router.post("/login", autenticar)

router.post("/olvide-password", olvidePassword)
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

//area privada
router.get('/perfil', checkAuth, perfil)

export default router;