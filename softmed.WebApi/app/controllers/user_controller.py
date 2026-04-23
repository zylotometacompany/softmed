import json
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.repositories.user_repository import UserRepository
from app.services.user_service import UserService
from app.schemas.user_schema import CreateReceptionistRequest
from app.config.auth_guard import require_admin


def create_receptionist_controller(
    payload: CreateReceptionistRequest,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    user_repository = UserRepository(db)
    user_service = UserService(user_repository)

    try:
        user = user_service.create_receptionist(payload)
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "cpf": user.cpf,
            "address": user.address,
            "workload": user.workload,
            "role": user.role,
            "permissions": user.permissions,
            "is_active": user.is_active
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )