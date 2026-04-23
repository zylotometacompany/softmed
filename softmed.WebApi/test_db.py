import os
from dotenv import load_dotenv
import psycopg

load_dotenv(encoding="utf-8")

url = os.getenv("DATABASE_URL")
print("URL repr:", repr(url))

conn = psycopg.connect(url)
print("Conectou com sucesso!")

conn.close()