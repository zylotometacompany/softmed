from app.config.security import verify_password, create_access_token
from app.repositories.user_repository import UserRepository


class AuthService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def authenticate(self, email: str, password: str):
        user = self.user_repository.get_by_email(email)

        if not user:
            return None

        if not verify_password(password, user.password):
            return None

        token = create_access_token({
            "sub": user.email,
            "user_id": user.id,
            "name": user.name,
            "role_id": user.role_id,
            "role": user.role.name
        })

        return {
            "access_token": token,
            "token_type": "bearer"
        }