import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
{/*Sacar información del context medinate el hook */}
const RutaProtegida = () => {

    const { auth, cargando} = useAuth();

    if(cargando) return 'cargando ...'

    console.log('por q ', auth?._id)

    return (
        <>
            <Header/>
                {auth?._id? (
                    <main className='container mx-auto mt-10'>
                        <Outlet/>
                    </main>
                    ): <Navigate to="/" /> }   
            <Footer/>
        </>
    )
}

export default RutaProtegida;

/*El main es para que tenga mejor formato que lo vaya a outlet */