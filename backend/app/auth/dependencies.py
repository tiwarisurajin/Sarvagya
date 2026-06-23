from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from fastapi import Depends 
from app.auth.exceptions import (
    InvalidCredentialsException
)
from app.auth.tokens import(
    validate_access_token,
)
from app.users.repository import UserRepository


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")



def get_current_user(
        db:Session =Depends(get_db),
        token: str = Depends(oauth2_scheme)
        ):
    
    user_id = validate_access_token(token=token)

    if not user_id :
        raise InvalidCredentialsException()

    user = UserRepository.get_user(id=user_id)

    if not user :
        raise InvalidCredentialsException()
    
    return user
                       