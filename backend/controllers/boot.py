# Tengo que leer una incidencia 

# Analizar la inicidencia con NLP, lenguaje natural => SPACY?
# Generación de respuestas utilizando la IA generativa
# Concentración de citas utilizando aprendizaje automático
import sys
import os


from datetime import date, time, datetime, timezone # Importar date y time desde datetime
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'config'))


import db
import twilio_conf
import openAI_config
import openai

base_datos = db.conectar()
collection = base_datos['incidencias']


#primero leear la incidencia
incidencia = collection.find_one({}, sort=[("prioridad", 1)])

print('Imprimiendo la incidencia ',incidencia.get('descripcion', incidencia))
print('Imprimiendo la prioridad ',incidencia.get('prioridad', incidencia))

#generar respuestas openAI
#Eres un asistente que ayuda a gestionar citas para servicios y das citas 

response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Eres un asistente que ayuda a gestionar citas con el usuario para concertar una visita presencial"},
            {"role": "user", "content": incidencia.get('descripcion', incidencia)}
        ],
        max_tokens=150,
        temperature=0.7
    )

print(response.choices[0].message['content'].strip())


#Mandar la información

cliente_twilio = twilio_conf.twilio_client()

message = cliente_twilio.messages.create(
  from_='whatsapp:+14155238886',
  body=response.choices[0].message['content'].strip(),
  status_callback='http://127.0.0.1:5000/callback',
  to='whatsapp:+34625958554'

)
print(message.sid)




#Obtener los datos del callback
