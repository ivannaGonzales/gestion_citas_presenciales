from pymongo import MongoClient


# Conexión a MongoDB
def conectar():
    try:
        # Intenta crear un cliente MongoClient
        MONGO_URI = 'mongodb://localhost:27017/'
        MONGO_BASEDATOS = 'gestion_citas'
        MONGO_COLECCION = 'incidencias'

        client = MongoClient('mongodb://localhost:27017/')
        base_datos = client[MONGO_BASEDATOS]
        # Verifica la conexión
        info = client.server_info()
        
        print("Conectado a MongoDB exitosamente!")
        print(f"Versión de MongoDB: {info['version']}")

        return base_datos


    
    except Exception as e:
        print(f"No se pudo conectar a MongoDB. Error: {str(e)}")

