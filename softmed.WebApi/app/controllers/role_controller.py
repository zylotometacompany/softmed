from fastapi import Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.repositories.role_repository import RoleRepository
from app.services.role_service import RoleService


def list_roles_controller(db: Session = Depends(get_db)):
    role_repository = RoleRepository(db)
    role_service = RoleService(role_repository)

    roles = role_service.list_roles()

    return [
        {
            "id": role.id,
            "name": role.name,
            "description": role.description
        }
        for role in roles
    ]