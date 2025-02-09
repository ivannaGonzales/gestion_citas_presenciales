import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    console.log(req.body);
    //osea yo soy veterinario y puedo ver mis pacientes
    //el veterinario lo puedo ver con el token
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteGuardado = await paciente.save();
        res.json(pacienteGuardado);

    } catch (error) {
        console.log(error)
    }
}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
        .where("veterinario")
        .equals(req.veterinario);

    res.json(pacientes);

}

const obtenerPaciente = async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    //tengo que saber que ese paciente esta 
    //agregado por un veterinario en concreto

    if (paciente.veterinario._id.toString() != req.veterinario._id
        .toString()) {
        //significa que alguien esta intentando acceder
        // a un paciente que no es de el
        res.json({ msg: 'accion no valida' })
    }
    if (paciente) {
        res.json(paciente);
    }

}

const actualizarPaciente = async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    if (!paciente) {
        res.status(404).json({ msg: 'No encontrado' })
    }
    //tengo que saber que ese paciente esta 
    //agregado por un veterinario en concreto

    if (paciente.veterinario._id.toString() != req.veterinario._id
        .toString()) {
        //significa que alguien esta intentando acceder
        // a un paciente que no es de el
        res.json({ msg: 'accion no valida' })
    }
    if (paciente) {
        //actualizar paciente
        // si no está presente le pones || paciente.nombre (lo que ya tiene el objeto)
        paciente.nombre = req.body.nombre || paciente.nombre;
        paciente.propietario = req.body.propietario || paciente.propietario;
        paciente.email = req.body.email || paciente.email;
        paciente.fecha = req.body.fecha || paciente.fecha;
        paciente.sintomas = req.body.sintomas || paciente.sintomas;
        try {
            const pacienteActualizado = await paciente.save();
            res.json(pacienteActualizado);

        } catch (error) {
            console.error(error)

        }
    }

}
const eliminarPaciente = async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    if (!paciente) {
        res.status(404).json({ msg: 'No encontrado' })
    }
    //tengo que saber que ese paciente esta 
    //agregado por un veterinario en concreto

    if (paciente.veterinario._id.toString() != req.veterinario._id
        .toString()) {
        //significa que alguien esta intentando acceder
        // a un paciente que no es de el
        res.json({ msg: 'accion no valida' })
    }

    try {
        await paciente.deleteOne();
        res.json({ msg: 'Paciente eliminado' })

    } catch (error) {
        console.log(error);

    }
}

export {
    actualizarPaciente, agregarPaciente, eliminarPaciente, obtenerPaciente, obtenerPacientes
};

