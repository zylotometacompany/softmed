from sqlalchemy.orm import Session
from app.models.permission_model import Permission
from app.models.role_permission_model import RolePermission


class PermissionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_permission_by_name(self, name: str):
        return self.db.query(Permission).filter(Permission.name == name).first()

    def create_permission(self, name: str, description: str | None = None):
        permission = Permission(name=name, description=description)
        self.db.add(permission)
        self.db.commit()
        self.db.refresh(permission)
        return permission

    def role_has_permission(self, role_id: int, permission_id: int):
        return self.db.query(RolePermission).filter(
            RolePermission.role_id == role_id,
            RolePermission.permission_id == permission_id
        ).first()

    def assign_permission_to_role(self, role_id: int, permission_id: int):
        relation = RolePermission(role_id=role_id, permission_id=permission_id)
        self.db.add(relation)
        self.db.commit()
        self.db.refresh(relation)
        return relation