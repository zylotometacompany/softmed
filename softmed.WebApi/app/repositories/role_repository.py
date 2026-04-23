from sqlalchemy.orm import Session
from app.models.role_model import Role


class RoleRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_name(self, name: str):
        return self.db.query(Role).filter(Role.name == name).first()

    def create(self, name: str, description: str | None = None):
        role = Role(name=name, description=description)
        self.db.add(role)
        self.db.commit()
        self.db.refresh(role)
        return role

    def get_all(self):
        return self.db.query(Role).all()