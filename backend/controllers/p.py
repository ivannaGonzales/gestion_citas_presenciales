# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="Revenge of the Sith was clearly the best of the prequel trilogy.",
    messaging_service_sid="MG9752274e9e519418a7406176694466fa",
    to="+441632960675",
)

print(message.body)