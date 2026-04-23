import json
from app.config.security import hash_password
from app.repositories.user_repository import UserRepository


class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def create_receptionist(self, payload):
        existing_email = self.user_repository.get_by_email(payload.email)
        if existing_email:
            raise ValueError("Já existe um usuário com esse e-mail")

        existing_cpf = self.user_repository.get_by_cpf(payload.cpf)
        if existing_cpf:
            raise ValueError("Já existe um usuário com esse CPF")

        user = self.user_repository.create(
            name=payload.name,
            email=payload.email,
            password=hash_password(payload.password),
            cpf=payload.cpf,
            birth_date=payload.birth_date,
            address=payload.address,
            workload=payload.workload,
            role="receptionist",
            permissions=payload.permissions,
            is_active=True
        )

        user.permissions = json.loads(user.permissions) if user.permissions else []
        return user