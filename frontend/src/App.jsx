import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'
import AuthLayaout from './layout/AuthLayaout'
import RutaProtegida from './layout/RutaProtegida'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Login from './paginas/login'
import NuevoPassword from './paginas/NuevoPassword'
import OlvidePassword from './paginas/OlvidePassword'
import Registrar from './paginas/Registrar'
function App() {

  return (
    <BrowserRouter>
     <AuthProvider>
      <PacientesProvider>
      <Routes>
          <Route path="/" element={<AuthLayaout/>}>{/* Este es el elemento principal y luego ya vienen los secundarios*/}
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
          </Route>

          {/*Las rutas protegidas, tienen que tener token que no esten experidos */}

          {/*Carga el componente de rutaProtegida y enseña lo que hay en administrar pacientes */}
          <Route path="/admin" element={<RutaProtegida/>}>
            <Route index  element={<AdministrarPacientes/>}/>
          </Route>

        </Routes>
      </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
