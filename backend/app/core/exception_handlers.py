from fastapi import (
    FastAPI,
    Request,
)
from fastapi.responses import JSONResponse

from app.auth.exceptions import AuthExceptions


def register_exception_handler(
        app:FastAPI
)-> None: 
    
    @app.exception_handler(AuthExceptions)
    async def auth_exception_handler(
        request: Request,
        exc: AuthExceptions
    ):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail":exc.detail}
        )
