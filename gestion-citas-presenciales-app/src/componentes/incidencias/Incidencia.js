

function Incidencia({ incidencia }) {

    const { fecha, usuario, motivo, resuelta } = incidencia;
    return (
        <li className="incidencia">
            <div class="info-incidencia">
                <p class="fecha_resuelta"> Fecha resuelta: {
                    new Date(fecha).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",

                    })}</p>
                <p class="motivo">Motivo: {motivo}</p>
                <p className="resuelta">Estado: {resuelta ? "Resuelta" : "Pendiente"}</p>
                <p className="usuario">
                    Usuario: {usuario?.nombre} {usuario?.apellido1}</p>
            </div>
            <div class="acciones">
                <a href="#" class="btn btn-azul">
                    <i class="fas fa-pen-alt"></i>
                    Editar Cliente
                </a>
                <button type="button" class="btn btn-rojo btn-eliminar">
                    <i class="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Incidencia;