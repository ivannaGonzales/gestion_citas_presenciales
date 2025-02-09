import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const usePacientes = () => {
    return useContext(AuthContext)
}

export default usePacientes