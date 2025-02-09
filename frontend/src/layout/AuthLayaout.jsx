
import { Outlet } from "react-router-dom"
const AuthLayaout = () => {
  return (
    <>

        <main className="container mx-auto md:grid grid-cols-2 mt-12 gap-10 p-5 items-center">
          <Outlet/> {/* para cargar el contenido de cada uno de los componentes que
        vienen despues */}
        </main>
        




    </>
  )
}

export default AuthLayaout