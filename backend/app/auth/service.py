from app.database.dependencies import get_db
from uuid import UUID
from app.users.models import User
from app.auth.password import (
    hash_password,
    verify_password
)
from app.users.repository import UserRepository
from sqlalchemy.orm import Session
from app.auth.exceptions import (
    EmailAlreadyExistsException,
    UserNameAlreadyExistsException,
    InvalidCredentialsException,
    InvalidTokenException,

)
from app.auth.schemas import(
    RegisterUserRequest,
    RegisterUserResponse,
    LoginUserRequest,
    LoginUserResponse,
    RefreshTokenRequest,
    RefreshTokenResponse
)
from app.auth.tokens import(
    create_access_token,
    create_refresh_token,
    validate_access_token,
    validate_refresh_token,
)
from app.auth.repository import AuthRepository

# =============================================================================================
#==============================================================================================
#                     Codes Start From Here
#==============================================================================================
#==============================================================================================


class AuthService():

# =============================================================================================
#==============================================================================================
#  Registration of User
#==============================================================================================
#==============================================================================================


    @staticmethod
    def register_user(
        db:Session,
        user: RegisterUserRequest
    ):
        username_exists=UserRepository.get_user(
            db=db,
            username=user.username,
            )        
        if username_exists:
            raise UserNameAlreadyExistsException()
       
        email_exists=UserRepository.get_user(
            db=db,
            email=user.email,
        )        
        if email_exists :
            raise EmailAlreadyExistsException()
        
        hashed_password = hash_password(
            password=user.password,
        )
        user.password = hashed_password
        
        created_user=UserRepository.create_user(
            db=db,
            user=user
        )
            
        db.commit()
        return created_user
      
# =============================================================================================
#==============================================================================================
#    Login User
#==============================================================================================
#==============================================================================================
    @staticmethod
    def login_user(
            db:Session,
            user_credentials : LoginUserRequest
    ) -> LoginUserResponse:
        
        db_user =UserRepository.get_user(
            db=db,
            email=user_credentials.email
        )
        if not db_user :
            raise InvalidCredentialsException()
        
        authenticate_password = verify_password(
            password = user_credentials.password,
            hashed_password = db_user.hashed_password
        )
        if not authenticate_password :
            raise InvalidCredentialsException()
        
        id = str(db_user.id)
        
        access_token = create_access_token({"sub": id})

        refresh_token = create_refresh_token({"sub": id})

        refresh_token_save = AuthRepository.save_refresh_tokens_in_db(
            db=db,
            user_id= id,
            refresh_token=refresh_token
        )
        db.commit()

        return {
            'access_token' : access_token,
            'refresh_token': refresh_token,
            'token_type'   : 'bearer'
            }
    

    @staticmethod
    def refresh_token(
        db: Session,
        token: RefreshTokenRequest,

    )-> str:
        
        verify_token = validate_refresh_token(
            token=token.token
        )

        if not verify_token:
            raise InvalidTokenException()
        
        verify_db_token = AuthRepository.get_refresh_token(
            db=db,
            token=token.token
        )

        if not verify_db_token:
            raise InvalidTokenException()
        
        id = str(verify_db_token.user_id)

        access_token = create_access_token({"sub":id})

        return {"access_token": access_token,
                "tokem_type": 'bearer'}


    @staticmethod
    def logout(
        db:Session,
        token : RefreshTokenRequest
    ) :
        
        get_token = AuthRepository.get_refresh_token(
            db=db,
            token=token.token
            )
        print(get_token)
        
        if not get_token :
            raise InvalidCredentialsException()
        
        db.delete(get_token)
        db.commit()
        return {"message": "LoggedOut Sucessfully"}
