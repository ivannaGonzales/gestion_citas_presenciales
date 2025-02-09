import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";
const checkAuth = async (req, res, next) => {
    //se va al siguiente que es perfil
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        console.log('Si tiene el token bearer')

        try {
            // la primera parte es del token req.headers.authorization
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado")
            return next();
        } catch (error) {
            const e = new Error("Token no válido");
            return res.status(403).json({ msg: e.message })

        }
    }

    if (!token) {
        const error = new Error('Token no valido o inexistente')
        return res.status(403).json({ msg: error.message })
    }

    next();
}

export default checkAuth;