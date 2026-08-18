/**
 * Servicio encargado de gestionar operaciones relacionadas con la entidad Usuario
 */
export class UsuarioService {
    /**
     * Crea un servicio de usuarios.
     * @param {Object} usuarioRepository Repositorio de usuarios.
     */
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Obtiene un usuario a partir de su teléfono.
     * @param {string|number} telefono Teléfono de búsqueda.
     * @returns {Promise<*>}
     */
    async obtenerUsuarioPorTelefono(telefono) {
        const telefonoNormalizado = String(telefono ?? "").replace(/\D/g, "");
        if (!telefonoNormalizado) {
            return null;
        }

        return this.usuarioRepository.findOne({
            telefono: Number(telefonoNormalizado)
        });
    }
}
