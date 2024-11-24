class Cita():
    def __init__(self, fecha_hora, duracion):
        self.fecha_hora = fecha_hora
        self.duracion = duracion

    def get_fecha_hora(self):
        return self.fecha_hora
    
    def set_fecha_hora(self, fecha_hora):
        self.fecha_hora = fecha_hora
    
    def get_duracion (self):
        return self.duracion
        
    def set_duracion (self, duracion):
        self.duracion = duracion