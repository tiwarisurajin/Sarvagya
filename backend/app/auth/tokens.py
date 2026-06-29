from jose import  JWTError,jwt
from app.core.config import settings
from datetime import datetime,timedelta,timezone
from app.auth.exceptions import (
    InvalidCredentialsException,
    InvalidTokenException,
)


# ===========================
# =================================
# General Helpers
# ============================
# ================================

def create_token(
        sub: dict,
        secret_key : str,
        expires_delta : timedelta,
        token_type : str
)-> str:

    payload = sub.copy()

    expire = datetime.now(timezone.utc) + expires_delta
    
    payload.update({'exp' : expire,
                    'token_type':token_type
                    })

    token=jwt.encode(
        payload,
        secret_key,
        algorithm= settings.ALGORITHM
    )
    
    return token

# --------------------Token_verification --------------------
def verify_token(token:str,
                 SECRET_KEY : str,
                 ALGORITHM : str):
    try:
   
        payload = jwt.decode(token,
                         SECRET_KEY,
                         algorithms=[ALGORITHM]
                         )
        
        return payload
    
    except Exception as e:
        print(e)
        raise JWTError
    



# --------------------Create Access Token --------------------

def create_access_token(sub:dict) -> str:

    return create_token(
        sub=sub,
        secret_key=settings.ACCESS_SECRET_KEY,
        expires_delta = timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        token_type='access'
    )

# -------------------- Create Refresh Token --------------------


def create_refresh_token(sub:dict) -> str:

    return create_token(
        sub=sub,
        secret_key=settings.REFRESH_SECRET_KEY,
        expires_delta = timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        token_type='refresh'
    )






# ============================================================
# Token Validation
# ============================================================
def validate_access_token(token: str):

    verified_token = verify_token(
        token=token,
        SECRET_KEY=settings.ACCESS_SECRET_KEY,
        ALGORITHM=settings.ALGORITHM
    )

    if not verified_token :
        raise InvalidTokenException()
    
    id = verified_token("id")
    
    return id


def validate_refresh_token(token: str):

    print(token)

    verified_token = verify_token(
        token=token,
        SECRET_KEY=settings.REFRESH_SECRET_KEY,
        ALGORITHM=settings.ALGORITHM
    )

    if not verified_token :
        raise InvalidTokenException()
    
    
    return id


