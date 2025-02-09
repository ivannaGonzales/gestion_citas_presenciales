import { useContext } from 'react';

/*con useContext podemos extraer los datos */
import AuthContext from '../context/AuthProvider';
/*Es para obtener el contexto pero cual contexto? el AuthContext */

const useAuth = () => {
    const context = useContext(AuthContext);
    //return useContext(AuthContext)
    return context
}


export default useAuth

/*Este es nuestro custom hook */