import os
from dotenv import load_dotenv
import twilio
from twilio.rest import Client



def twilio_client():
    load_dotenv()
    account_sid = os.getenv("ACCOUNT_SID")
    auth_token = os.getenv("AUTH_TOKEN")
    client = Client(account_sid,auth_token)
    return client



twilio_client()