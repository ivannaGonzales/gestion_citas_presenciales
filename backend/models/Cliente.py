class Cliente():
    def __init__(self, nombre, apellido1, apellido2, email, telefono, direccion, atendido, cita):
        self._nombre = nombre
        self._apellido1 = apellido1
        self._apellido2 = apellido2
        self._email = email
        self._telefono = telefono
        self._direccion = direccion
        self.atendido = atendido
        self.cita = cita

    # Getters
    def get_cita(self):
        return self.cita

    def set_cita(self, cita):
        self.cita = cita
        
    def get_atendido(self):
        return self.atendido

    def set_atendido(self, atendido):
        self.atendido = atendido

    def get_nombre(self):
        return self._nombre

    def get_apellido1(self):
        return self._apellido1

    def get_apellido2(self):
        return self._apellido2

    def get_email(self):
        return self._email

    def get_telefono(self):
        return self._telefono

    def get_direccion(self):
        return self._direccion

    # Setters
    def set_nombre(self, nombre):
        self._nombre = nombre

    def set_apellido1(self, apellido1):
        self._apellido1 = apellido1

    def set_apellido2(self, apellido2):
        self._apellido2 = apellido2

    def set_email(self, email):
        self._email = email

    def set_telefono(self, telefono):
        self._telefono = telefono

    def set_direccion(self, direccion):
        self._direccion = direccion