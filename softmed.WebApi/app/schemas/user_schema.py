from datetime import date
from typing import List
from pydantic import BaseModel, EmailStr, Field


class CreateReceptionistRequest(BaseModel):
    name: str = Field(..., min_length=3)
    email: EmailStr
    password: str = Field(..., min_length=6)
    cpf: str = Field(..., min_length=11, max_length=14)
    birth_date: date
    address: str
    workload: str
    permissions: List[str]


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    cpf: str | None = None
    address: str | None = None
    workload: str | None = None
    role: str
    permissions: list[str]
    is_active: bool

    class Config:
        from_attributes = True