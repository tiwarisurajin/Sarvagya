from fastapi import FastAPI
from app.auth.routes import router 
from fastapi.middleware.cors import CORSMiddleware
from app.core.exception_handlers import register_exception_handler


app = FastAPI()

register_exception_handler(app)


app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:5173",
                                  "http://127.0.0.1:5173"],
                                  allow_credentials=True,
                                  allow_methods=["*"],
                                  allow_headers=["*"])

app.include_router(router)


@app.get("/check")
def check():
    return{"Message": "API is working"}

