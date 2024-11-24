import openai
import os
from dotenv import load_dotenv

load_dotenv()


#creo que desde aqui puedo crear las api_keys

openai.api_key = os.getenv("OPENAI_API_KEY")