SoftMed

Monorepo do projeto SoftMed, composto por:

frontend → aplicação web em React + Vite + TypeScript
backend → API em Python + FastAPI
mobile → aplicativo em React Native + Expo
ESTRUTURA DO PROJETO

softmed/
frontend/
backend/
mobile/

PRÉ-REQUISITOS

Antes de rodar o projeto, tenha instalado:

Geral:

Git
Node.js (recomendado LTS)
npm

Backend:

Python 3.10 ou superior

Mobile:

Expo Go no celular
ou
emulador Android/iOS configurado
COMO CLONAR O PROJETO

git clone URL_DO_REPOSITORIO
cd softmed

FRONTEND

Aplicação web desenvolvida com Vite + React + TypeScript.

Como instalar:

Entre na pasta frontend
Rode:
npm install

Como rodar em desenvolvimento:
npm run dev

O projeto normalmente ficará disponível em:
http://localhost:5173

Como gerar build:
npm run build

A build será gerada na pasta:
dist/

Como visualizar a build localmente:
npm run preview

BACKEND

API desenvolvida com FastAPI.

Como instalar:

Entre na pasta backend

Criar ambiente virtual no Windows:
py -m venv venv

Ativar ambiente virtual no CMD:
venv\Scripts\activate

Ativar ambiente virtual no PowerShell:
venv\Scripts\Activate.ps1

Instalar dependências:
py -m pip install -r requirements.txt

Caso não exista o requirements.txt ainda, você pode instalar manualmente:
py -m pip install fastapi uvicorn

Como rodar em desenvolvimento:
uvicorn app.main:app --reload

A API ficará disponível em:
http://127.0.0.1:8000

Swagger:
http://127.0.0.1:8000/docs

Como gerar ou atualizar o requirements.txt:
pip freeze > requirements.txt

MOBILE

Aplicativo mobile desenvolvido com Expo.

Como instalar:

Entre na pasta mobile
Rode:
npm install

Como rodar em desenvolvimento:
npx expo start

Depois disso você pode:

pressionar "a" para abrir no Android Emulator
pressionar "w" para abrir no navegador
escanear o QR Code com o Expo Go no celular

Como gerar build:
O Expo usa EAS Build para builds mais completas.

Instalar o EAS CLI:
npm install -g eas-cli

Fazer login:
eas login

Build Android:
eas build -p android

Build iOS:
eas build -p ios

Obs.: para iOS, normalmente é necessário conta Apple Developer.

ORDEM RECOMENDADA PARA RODAR O PROJETO COMPLETO

Abra terminais separados.

Subir o backend:
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
Subir o frontend:
cd frontend
npm install
npm run dev
Subir o mobile:
cd mobile
npm install
npx expo start
OBSERVAÇÕES IMPORTANTES

Frontend:
O frontend consome a API do backend.
Verifique se a URL da API está correta nos arquivos de configuração.

Exemplo local:
http://127.0.0.1:8000

Mobile:
Se estiver testando no celular físico, localhost não funciona como no navegador.
Nesse caso, use o IP local da máquina onde o backend está rodando.

Exemplo:
http://192.168.0.10:8000

SCRIPTS ÚTEIS

Frontend:
npm run dev
npm run build
npm run preview

Backend:
uvicorn app.main:app --reload

Mobile:
npx expo start
eas build -p android
eas build -p ios

TECNOLOGIAS UTILIZADAS

Frontend:

React
Vite
TypeScript

Backend:

Python
FastAPI
Uvicorn

Mobile:

React Native
Expo
AUTOR

Projeto desenvolvido por Nicolas Enoque.
