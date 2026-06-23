from pydantic import BaseModel,EmailStr,Field
from uuid import UUID


# ============================================================
#  Registration Related Schema
# ============================================================


class RegisterUserRequest(BaseModel):
    name : str
    username : str
    email : EmailStr
    password : str


class RegisterUserResponse(BaseModel):
    id : UUID
    email : EmailStr
    is_verified : bool = True


# ============================================================
# Login Related Schema
# ============================================================

class LoginUserRequest(BaseModel):
    email: EmailStr
    password : str

class LoginUserResponse(BaseModel):
    access_token : str
    refresh_token : str
    token_type : str


# =======================================
#   RefreshToken Related schema
#=======================================================
class RefreshTokenRequest(BaseModel):
    token: str

class RefreshTokenResponse(BaseModel):
    access_token : str
    token_type : str = 'bearer'







