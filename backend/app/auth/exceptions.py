from fastapi import HTTPException,status

class AuthExceptions(Exception):
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
    detail= "Internal Server Error"

class EmailAlreadyExistsException(AuthExceptions):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail = "Email already exists"

class UserNameAlreadyExistsException(AuthExceptions):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail = "username already exists"


class InvalidCredentialsException(AuthExceptions):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail = "Invalid Credentials"


class InvalidTokenException(AuthExceptions):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail="Invalid Credentials"