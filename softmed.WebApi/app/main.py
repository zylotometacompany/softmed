from fastapi import FastAPI


app = FastAPI(
    title="SoftMed Web API",
    description="Documentação da API do sistema SoftMed",
    version="1.0.0",
    docs_url="/swagger"
)

@app.get("/")
def home():
    return {"message": "API rodando"}

