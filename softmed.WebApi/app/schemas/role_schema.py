from typing import List
from pydantic import BaseModel


class RoleResponse(BaseModel):
    id: int
    name: str
    description: str | None = None

    class Config:
        from_attributes = True


class RoleWithPermissionsResponse(BaseModel):
    id: int
    name: str
    description: str | None = None
    permissions: List[str]

    class Config:
        from_attributes = True