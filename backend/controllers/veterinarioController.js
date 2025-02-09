
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";
const registrar = async (req, res) => {

    const { email, nombre } = req.body;
    const existeUsuario = await Veterinario.findOne({ email });

    if (existeUsuario) {
        return res.status(400).json({ msg: error.message })
    }
    try {
        // Prevenir usuarios duplicados

        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        //aqui es un buen lugar para enviar el email
        //requiremos el token, requerimos el email al que le vamos a enviar
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error)

    }

}

const perfil = (req, res) => {
    //osea como primero he puesto el middleware y en el req he guardado yo directamente el perfil visitado
    const { veterinario } = req;
    res.json(veterinario)
}

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message })
    }

    try {

        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;

        await usuarioConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente" })

    } catch (error) {
        console.log(error)
    }
    console.log(usuarioConfirmar);


}

const autenticar = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    const usuario = await Veterinario.findOne({ email })

    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message })
    }
    //confirmar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmado");
        return res.status(404).json({ msg: error.message })
    }
    //autenticar al usuario
    //comparo el password que me han dado por el formualrio (req) y el que tengo en base de datos

    if (await usuario.comprobarPassword(password)) {
        //autenticar
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
        })
    }
    else {
        const error = new Error("El password es incorecto");
        return res.status(403).json({ msg: error.message })
    }


}

const olvidePassword = async (req, res) => {
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({ email });

    if (!existeVeterinario) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: "El usuario no existe" })
    }
    //creo una nuevo token pero no la autentico todavía
    //osea un token es como una nueva sesión
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        //enviar instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });
        res.json({ msg: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        console.log(error)
    }

}
const comprobarToken = async (req, res) => {

    const { token } = req.params;//comprobar a que usuario le di ese token

    const tokenValido = await Veterinario.findOne({ token });

    if (tokenValido) {
        res.json({ msg: "Token valido y el usuario existe" }) //con este mosramos el formulario

    } else {
        const error = new Error('Token no valido')
        return res.status(400).json({ msg: error.message })
    }
}
const nuevoPassword = async (req, res) => {
    //almacenar el p
    const { token } = req.params;

    const { password } = req.body;

    const veterinario = await Veterinario.findOne({ token })

    if (!veterinario) {
        const error = new Error("Hubo error");

    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: "Password modificado correctamente" })
        console.log(veterinario)

    } catch (error) {
        console.log(error)
    }

}

export { autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar };

