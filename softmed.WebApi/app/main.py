from fastapi import FastAPI
from app.config.database import Base, engine, SessionLocal

from app.models.user_model import User
from app.models.role_model import Role
from app.models.permission_model import Permission
from app.models.role_permission_model import RolePermission
from app.routes.role_routes import router as role_router

from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router

from app.seed.seed_access_control import seed_access_control
from app.seed.seed_user import seed_default_user


app = FastAPI(
    title="SoftMed Web API",
    description="Documentação da API do sistema SoftMed",
    version="1.0.0",
    docs_url="/swagger"
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        seed_access_control(db)
        seed_default_user(db)
    finally:
        db.close()


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(role_router)


