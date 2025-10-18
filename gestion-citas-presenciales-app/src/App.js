import { Fragment } from "react";

// Routing
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

/* Layout */
import Header from "./componentes/layout/Headers";
import Navegacion from "./componentes/layout/Navegacion";

/* Componentes */
import Incidencias from "./componentes/incidencias/Incidencias";
import Usuarios from "./componentes/usuarios/Usuarios";
function App() {
  return (
    <Router>
      <Fragment>
        <Header />

        <div className="grid contenedor contenido-principal">
          <Navegacion />

          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/incidencias" element={<Incidencias />} />
              <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
          </main>

        </div>
      </Fragment>
    </Router>
  );
}

export default App;
