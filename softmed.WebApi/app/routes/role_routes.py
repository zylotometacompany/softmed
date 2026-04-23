from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.controllers.role_controller import list_roles_controller
from app.config.database import get_db
from app.config.auth_guard import require_admin

router = APIRouter(prefix="/roles", tags=["Roles"])


@router.get("/")
def list_roles(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return list_roles_controller(db)