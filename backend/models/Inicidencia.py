class Incidencia:
    def __init__(self, cliente, fecha_creacion, categoria, prioridad, descripcion, estado, solucion, fecha_solucion, hora_cita):
        self._cliente = cliente
        self._fecha_creacion = fecha_creacion
        self._categoria = categoria
        self._prioridad = prioridad
        self._descripcion = descripcion
        self._estado = estado
        self._solucion = solucion
        self._fecha_solucion = fecha_solucion
        self._hora_cita = hora_cita

    def get_cliente(self):
        return self._cliente

    def set_cliente(self, value):
        if isinstance(value, str):
            self._cliente = value
        else:
            raise TypeError("El cliente debe ser una cadena de texto.")

    def get_fecha_creacion(self):
        return self._fecha_creacion


    def get_categoria(self):
        return self._categoria

    def set_categoria(self, value):
        if isinstance(value, str):
            self._categoria = value
        else:
            raise TypeError("La categoría debe ser una cadena de texto.")

    def get_prioridad(self):
        return self._prioridad

    def set_prioridad(self, value):
        if isinstance(value, int) and 1 <= value <= 5:
            self._prioridad = value
        else:
            raise ValueError("La prioridad debe ser un número entero entre 1 y 5.")

    def get_descripcion(self):
        return self._descripcion

    def set_descripcion(self, value):
        if isinstance(value, str):
            self._descripcion = value
        else:
            raise TypeError("La descripción debe ser una cadena de texto.")

    def get_estado(self):
        return self._estado

    def set_estado(self, value):
        if isinstance(value, str):
            self._estado = value
        else:
            raise TypeError("El estado debe ser una cadena de texto.")

    def get_solucion(self):
        return self._solucion

    def set_solucion(self, value):
        if isinstance(value, str):
            self._solucion = value
        else:
            raise TypeError("La solución debe ser una cadena de texto.")

    def get_fecha_solucion(self):
        return self._fecha_solucion

    def get_hora_cita(self):
        return self._hora_cita

