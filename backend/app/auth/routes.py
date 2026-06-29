from fastapi import APIRouter,status,Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.auth.schemas import (
    RegisterUserRequest,
    RegisterUserResponse,
    LoginUserRequest,
    LoginUserResponse,
    RefreshTokenRequest,
    RefreshTokenResponse
)
from app.auth.service import(
    AuthService
)
from app.auth.dependencies import get_current_user




router = APIRouter(
    prefix="/auth",
    tags =["Authentication"]
)

# =======================================
#  Register
#=======================================================

@router.post("/register",
             status_code=status.HTTP_200_OK,
             response_model=RegisterUserResponse
             )
def register(
    user_data : RegisterUserRequest,
    db:Session = Depends(get_db)
):
    return (AuthService.register_user(
        db=db,
        user=user_data
    ))

# =======================================
# Login
#=======================================================

@router.post("/login",
             status_code=status.HTTP_200_OK,
             response_model=LoginUserResponse
             )
def login_user(
    user_credentials : LoginUserRequest,
    db: Session= Depends(get_db)
):
    return (AuthService.login_user(
        db=db,
        user_credentials = user_credentials
    )) 
# =======================================
# Refresh Token
#=======================================================

@router.post("/refresh",
             status_code=status.HTTP_200_OK,
             response_model=RefreshTokenResponse
             )
def refresh_user(
    token : RefreshTokenRequest,
    db: Session= Depends(get_db)
):
    return (AuthService.refresh_token(
        db=db,
        token=token
    )) 


@router.post("/logout",
             status_code=status.HTTP_200_OK
             )
def log_out(
    token : RefreshTokenRequest,
    db:Session= Depends(get_db),
    
) :
    
    return AuthService.logout(
        db=db,
        token=token


    )
    