

import twilio


from twilio.rest import Client

account_sid = 'ACa64944b230070b0a5a41efcf7dccc343'
auth_token = 'f1d3d393c60b21ba3b2c12ac34ff6a14'
client = Client(account_sid, auth_token)

message = client.messages.create(
  from_='whatsapp:+14155238886',
  content_sid='HXb5b62575e6e4ff6129ad7c8efe1f983e',
  content_variables='{"1":"12/1","2":"3pm"}',
  body='Hola',
  to='whatsapp:+34625958554'
)

print(message.sid)

"""
from twilio.rest import Client

account_sid = 'ACa64944b230070b0a5a41efcf7dccc343'
auth_token = 'f1d3d393c60b21ba3b2c12ac34ff6a14'
client = Client(account_sid, auth_token)

message = client.messages.create(
  from_='whatsapp:+14155238886',
  body="¡Hola! Este es un mensaje de prueba desde Twilio.",
  to='whatsapp:+34625958554'
)

print(message.sid)
"""