from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.controllers.user_controller import create_receptionist_controller
from app.schemas.user_schema import CreateReceptionistRequest
from app.config.database import get_db
from app.config.auth_guard import require_admin

router = APIRouter(prefix="/users", tags=["Usuários"])


@router.post("/receptionist")
def create_receptionist(
    payload: CreateReceptionistRequest,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return create_receptionist_controller(payload, db, current_user)