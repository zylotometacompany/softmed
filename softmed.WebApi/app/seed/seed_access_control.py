from app.repositories.role_repository import RoleRepository
from app.repositories.permission_repository import PermissionRepository


ROLES = [
    {"name": "admin", "description": "Administrador do sistema"},
    {"name": "doctor", "description": "Médico"},
    {"name": "receptionist", "description": "Recepcionista"},
    {"name": "patient", "description": "Paciente"},
]

PERMISSIONS = [
    {"name": "users.create", "description": "Criar usuários"},
    {"name": "users.read", "description": "Ler usuários"},
    {"name": "users.update", "description": "Atualizar usuários"},
    {"name": "users.delete", "description": "Excluir usuários"},

    {"name": "receptionists.create", "description": "Criar recepcionistas"},
    {"name": "receptionists.read", "description": "Ler recepcionistas"},
    {"name": "receptionists.update", "description": "Atualizar recepcionistas"},
    {"name": "receptionists.delete", "description": "Excluir recepcionistas"},

    {"name": "patients.create", "description": "Criar pacientes"},
    {"name": "patients.read", "description": "Ler pacientes"},
    {"name": "patients.update", "description": "Atualizar pacientes"},
    {"name": "patients.delete", "description": "Excluir pacientes"},

    {"name": "prescriptions.create", "description": "Criar receitas"},
    {"name": "prescriptions.read", "description": "Ler receitas"},
    {"name": "prescriptions.update", "description": "Atualizar receitas"},
    {"name": "prescriptions.delete", "description": "Excluir receitas"},

    {"name": "followups.create", "description": "Criar acompanhamentos"},
    {"name": "followups.read", "description": "Ler acompanhamentos"},
    {"name": "followups.update", "description": "Atualizar acompanhamentos"},
    {"name": "followups.delete", "description": "Excluir acompanhamentos"},
]


ROLE_PERMISSIONS = {
    "admin": [
        "users.create", "users.read", "users.update", "users.delete",
        "receptionists.create", "receptionists.read", "receptionists.update", "receptionists.delete",
        "patients.create", "patients.read", "patients.update", "patients.delete",
        "prescriptions.create", "prescriptions.read", "prescriptions.update", "prescriptions.delete",
        "followups.create", "followups.read", "followups.update", "followups.delete",
    ],
    "doctor": [
        "receptionists.create", "receptionists.read", "receptionists.update", "receptionists.delete",
        "patients.create", "patients.read", "patients.update", "patients.delete",
        "prescriptions.create", "prescriptions.read", "prescriptions.update", "prescriptions.delete",
        "followups.create", "followups.read", "followups.update", "followups.delete",
    ],
    "receptionist": [
        "patients.create", "patients.read", "patients.update", "patients.delete",
        "prescriptions.read",
    ],
    "patient": [
        "prescriptions.read",
        "followups.create", "followups.read", "followups.update", "followups.delete",
    ],
}


def seed_access_control(db):
    role_repository = RoleRepository(db)
    permission_repository = PermissionRepository(db)

    created_roles = {}
    created_permissions = {}

    for role_data in ROLES:
        role = role_repository.get_by_name(role_data["name"])
        if not role:
            role = role_repository.create(
                name=role_data["name"],
                description=role_data["description"]
            )
        created_roles[role.name] = role

    for permission_data in PERMISSIONS:
        permission = permission_repository.get_permission_by_name(permission_data["name"])
        if not permission:
            permission = permission_repository.create_permission(
                name=permission_data["name"],
                description=permission_data["description"]
            )
        created_permissions[permission.name] = permission

    for role_name, permission_names in ROLE_PERMISSIONS.items():
        role = created_roles[role_name]

        for permission_name in permission_names:
            permission = created_permissions[permission_name]

            existing_relation = permission_repository.role_has_permission(
                role.id, permission.id
            )

            if not existing_relation:
                permission_repository.assign_permission_to_role(role.id, permission.id)

    print("Carga de roles e permissions concluída com sucesso.")