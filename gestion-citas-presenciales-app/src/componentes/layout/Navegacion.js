import { Link } from 'react-router-dom';
const Navegacion = () => {
    return (
        <aside class="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to={"/usuarios"} className="usuarios">Usuarios</Link>
                <Link to={"/incidencias"} className="incidencias">Incidencias</Link>
            </nav>
        </aside>
    );
}

export default Navegacion;