from app.repositories.user_repository import UserRepository
from app.repositories.role_repository import RoleRepository
from app.config.security import hash_password


def seed_default_user(db):
    user_repository = UserRepository(db)
    role_repository = RoleRepository(db)

    email = "admin@softmed.com"
    existing_user = user_repository.get_by_email(email)

    if existing_user:
        print("Usuário admin já existe. Seed ignorada.")
        return

    admin_role = role_repository.get_by_name("admin")
    if not admin_role:
        raise ValueError("Role 'admin' não encontrada. Execute a seed de access control antes.")

    user_repository.create(
        name="Administrador SoftMed",
        email=email,
        password=hash_password("123456"),
        cpf="00000000000",
        address="Endereço padrão",
        workload="40h",
        role_id=admin_role.id,
        is_active=True
    )

    print("Usuário admin criado com sucesso.")