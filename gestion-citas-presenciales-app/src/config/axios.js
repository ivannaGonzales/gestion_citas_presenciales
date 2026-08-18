import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:4000/api/gestion_citas_presenciales/'
});

export default clienteAxios;