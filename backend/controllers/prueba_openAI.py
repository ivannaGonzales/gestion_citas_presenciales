

import openai
import os
from dotenv import load_dotenv


load_dotenv()


prompt = 'La computadora no enciende.'

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Eres un asistente que ayuda a gestionar citas para servicios."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.7
    )

print(response.choices[0].message['content'].strip())