import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const Header = () => {
  const {cerrarSesion} = useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de {''}
            <span className="text-white font-black">
                Veterinaria
            </span>

        </h1>

        <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0' >
          <Link to="/admin" className='text-white text-sm uppercase font-bold'>Pacientes</Link>
          <Link to="/admin" className='text-white text-sm uppercase font-bold'>Perfil</Link>
        </nav>

        <button
          type="button"
          className='text-white text-sm uppercase font-bold'
          onClick={cerrarSesion}
        >
          Cerrar sesion
        </button>

      </div>

    </header>
  )
}

export default Header

/*Lo que hace header es solo la parte arriba una faja
container mx-auto flex justify-between lo hace para que el enlace vaya por un lado y el footer en el otro lado
el flex-col esta para que cuando se achique la ventana los enlaces se acumenlen uno debajo de otro
lg:flex-row para que se vaya de izquierda a derecha
el margin top es para que cuando se achique lo que pone en administrador de pacientes este más separado
de lo de pacientes perfil cerrar sesión
 */