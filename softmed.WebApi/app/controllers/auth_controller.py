from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService
from app.schemas.auth_schema import LoginRequest


def login_controller(payload: LoginRequest, db: Session = Depends(get_db)):
    user_repository = UserRepository(db)
    auth_service = AuthService(user_repository)

    result = auth_service.authenticate(payload.email, payload.password)

    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha inválidos"
        )

    return result