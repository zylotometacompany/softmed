from app.repositories.role_repository import RoleRepository


class RoleService:
    def __init__(self, role_repository: RoleRepository):
        self.role_repository = role_repository

    def list_roles(self):
        return self.role_repository.get_all()