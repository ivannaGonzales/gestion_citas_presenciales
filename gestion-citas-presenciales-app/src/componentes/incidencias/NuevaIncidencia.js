
import { Fragment, useState } from 'react';

function NuevaIncidencia() {
    // incidencia = state, saveIncidencia = funcion para guardar el state
    const [incidencia, saveIncidencia] = useState({
        nombre: '',
        motivo: '',
        fecha: '',
        resuelta: '',
        asignada: '',
        dni: '',
        telefono: '',
        mostrarLista: true // Inicializado como true para mostrar la lista

    });

    // Manejar la selección de empleado
    // Manejar la selección de empleado
    const manejarSeleccionEmpleado = (empleado) => {
        saveIncidencia({
            ...incidencia,
            empleadoSeleccionado: empleado,
            asignada: `${empleado.nombre} - ${empleado.departamento}`,
            mostrarLista: false // Ocultar la lista después de seleccionar
        });
    }
    // Manejar el click en el campo asignada
    const manejarClickAsignada = () => {
        saveIncidencia({
            ...incidencia,
            mostrarLista: true // Mostrar la lista al hacer click
        });
    }
    // Datos de empleados técnicos
    const empleados = [
        { id: 1, nombre: "Ana García", departamento: "Técnico de Redes - Nivel 3", especialidad: "Core IP/MPLS" },
        { id: 2, nombre: "Carlos López", departamento: "Técnico de Sistemas", especialidad: "Virtualización VMware" },
        { id: 3, nombre: "María Rodríguez", departamento: "Técnico de Seguridad", especialidad: "Firewalls Fortinet" },
        { id: 4, nombre: "Juan Pérez", departamento: "Técnico de Redes", especialidad: "Routers Cisco" },
        { id: 5, nombre: "Sofía González", departamento: "Técnico de Data Center", especialidad: "Storage NetApp" },
        { id: 6, nombre: "Pedro Martínez", departamento: "Técnico de VoIP", especialidad: "Unified Communications" },
        { id: 7, nombre: "Elena Sánchez", departamento: "Técnico de Cloud", especialidad: "AWS Solutions Architect" },
        { id: 8, nombre: "Luis Hernández", departamento: "Técnico de Seguridad", especialidad: "SIEM y SOC" },
        { id: 9, nombre: "Laura Díaz", departamento: "Técnico de Redes", especialidad: "SD-WAN Implementation" },
        { id: 10, nombre: "Miguel Gómez", departamento: "Técnico de Sistemas", especialidad: "Microsoft Azure" }
    ];

    //leer los datos del formulario

    const actualizarState = e => {
        //almacenar lo que el usuario escribe en el state
        saveIncidencia({
            //obtener una copia del state actual
            ...incidencia,
            [e.target.name]: e.target.value

        })
        console.log(incidencia)
    }

    // validar formulario

    const validarIncidencia = () => {
        const { nombre, motivo, fecha, resuelta, asignada, dni, telefono } = incidencia;

        let valido = !nombre.length || !motivo.length || !fecha.length || !resuelta.length || !asignada.length || !dni.length || !telefono.length;


        return valido;
    }
    return (
        <Fragment>
            <h2>Nueva incidencia</h2>

            <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Cliente:</label>
                    <input type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        value={incidencia.nombre}
                        onChange={actualizarState}
                    />
                </div>


                <div className="campo">
                    <label>DNI:</label>
                    <input type="text"
                        placeholder="DNI"
                        name="dni"
                        value={incidencia.dni}
                        maxLength="9" pattern="[0-9]{8}[A-Z]{1}"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>telefono:</label>
                    <input type="tel"
                        placeholder="telefono"
                        name="telefono"
                        value={incidencia.telefono}
                        onChange={actualizarState}
                    />
                </div>



                <div className="campo">
                    <label>Motivo:</label>
                    <input type="text"
                        placeholder="Motivo"
                        name="motivo"
                        value={incidencia.motivo}
                        onChange={actualizarState} />

                </div>

                <div className="campo">
                    <label>Fecha:</label>
                    <input type="datetime-local"
                        placeholder="Fecha incidencia"
                        name="fecha"
                        value={incidencia.fecha}
                        onChange={actualizarState} />

                </div>

                <div className="campo">
                    <label>Resuelta:</label>
                    <input type="text"
                        placeholder="Resuelta"
                        name="resuelta"
                        value={incidencia.resuelta}
                        onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Asignada:</label>
                    <div className="selector-empleado">
                        <input
                            type="text"
                            placeholder="Empleado asignado"
                            name="asignada"
                            value={incidencia.asignada}
                            readOnly
                            onClick={manejarClickAsignada}
                        />
                        {incidencia.mostrarLista && (
                            <div className="empleados-lista">
                                {empleados.map(empleado => (
                                    <div
                                        key={empleado.id}
                                        className="empleado-item"
                                        onClick={() => manejarSeleccionEmpleado(empleado)}
                                    >
                                        <div className="empleado-info">
                                            <div>{empleado.nombre}</div>
                                            <div className="empleado-departamento">{empleado.departamento}</div>
                                            <div className="empleado-especialidad">{empleado.especialidad}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="enviar">
                    <input type="submit"
                        class="btn btn-azul"
                        value="Agregar incidencia"
                        disabled={validarIncidencia()} />

                </div>

            </form>
        </Fragment>
    )
}

export default NuevaIncidencia;