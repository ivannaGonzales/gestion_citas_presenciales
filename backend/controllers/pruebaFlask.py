import sys
import os


from datetime import date, time, datetime, timezone # Importar date y time desde datetime
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'config'))

from flask import Flask, request, jsonify
import requests
import db
import twilio_conf
import openAI_config
import openai
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client

app = Flask(__name__)
# https://eed8-90-71-171-45.ngrok-free.app

base_datos = db.conectar()
collection = base_datos['incidencias']

@app.route('/', methods=['POST'])
def enviar_mensaje():

    cliente_twilio = twilio_conf.twilio_client()

    message = cliente_twilio.messages.create(
    body="ESTA FUNFIONANDO",
    messaging_service_sid="MG07a5b39c81e77dc872e9291d444f43a2",
    to="+34625958554",
    #from_="+12025176970"
    )
    resp = {
        "mensaje_enviado": message.body  # Devuelve el SID del mensaje para confirmar el envío
    }
    print(message)
    print('-----')

    return jsonify(resp)

@app.route("/callback", methods=['POST'])
def callback():
    incoming_msg = request.values.get('Body', '').lower()
    print('incoming_msg <3 ',incoming_msg)
    resp = MessagingResponse()
    msg = resp.message()
    responded = False
    if 'quote' in incoming_msg:
        # return a quote
        r = requests.get('https://api.quotable.io/random')
        if r.status_code == 200:
            data = r.json()
            quote = f'{data["content"]} ({data["author"]})'
        else:
            quote = 'I could not retrieve a quote at this time, sorry.'
        msg.body(quote)
        responded = True
    if 'cat' in incoming_msg:
        # return a cat pic
        msg.media('https://cataas.com/cat')
        responded = True
    if not responded:
        msg.body('I only know about famous quotes and cats, sorry!')
    return str(resp)


@app.route("/incoming_messages", methods=['POST'])
def incoming_messages():
    resp = {
        "mensaje_enviado": "hola about closets"
    }
    print(resp)
    return jsonify(resp)

if __name__ == '__main__':
    app.run(debug=True)

