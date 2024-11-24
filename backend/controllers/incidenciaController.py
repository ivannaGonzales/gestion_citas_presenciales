import sys
import os
from datetime import date, time, datetime, timezone # Importar date y time desde datetime

#sys.path.append('../config/')

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'config'))
#gestion_citas_presenciales/backend/config/db.py

import db

base_datos = db.conectar()

collection = base_datos['incidencias']


print('hola')

"""
from datetime import datetime

datos_incidencias = [
    {
        'cliente': 'Juan Pérez',
        'fecha_creacion': datetime(1999, 1, 28),
        'categoria': 'Hardware',
        'prioridad': 3,
        'descripcion': 'La computadora no enciende.',
        'estado': 'Pendiente',
        'solucion': None

    },
    {
        'cliente': 'María García',
        'fecha_creacion': datetime(2000, 5, 15),
        'categoria': 'Software',
        'prioridad': 2,
        'descripcion': 'El programa de contabilidad no responde.',
        'estado': 'En progreso',
        'solucion': 'Reinstalar el software.'
    },
    {
        'cliente': 'Carlos López',
        'fecha_creacion': datetime(2001, 8, 10),
        'categoria': 'Redes',
        'prioridad': 1,
        'descripcion': 'La conexión a internet está caída.',
        'estado': 'Resuelto',
        'solucion': 'Reemplazar el router defectuoso.',
        'fecha_solucion': datetime(2001, 8, 12),
    },
    {
        'cliente': 'Ana Rodríguez',
        'fecha_creacion': datetime(2002, 11, 22),
        'categoria': 'Seguridad',
        'prioridad': 4,
        'descripcion': 'Se ha detectado un intento de intrusión en el sistema.',
        'estado': 'Investigando',
        'solucion': None,
        'fecha_solucion': None
    },
    {
        'cliente': 'Pedro Martínez',
        'fecha_creacion': datetime(2003, 3, 5),
        'categoria': 'Impresión',
        'prioridad': 2,
        'descripcion': 'La impresora multifuncional no imprime en color.',
        'estado': 'Asignado',
        'solucion': None,
        'fecha_solucion': None
    }
]

collection.insert_many(datos_incidencias)
"""

