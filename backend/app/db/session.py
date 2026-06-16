from  sqlalchemy import create_engine
from app.core.config import settings
from sqlalchemy.orm import sessionmaker



DATABASE_URL =(
    f"postgresql+psycopg2://"
    f"{settings.DATABASE_HOSTNAME}"
    f"{settings.DATABASE_USERNAME}:"
    f"{settings.DATABASE_PASSWORD}@"
    f"{settings.DATABASE_PORT}/"
    f"{settings.DATABASE_NAME}"
)

engine= create_engine(DATABASE_URL)

SessionLocal= sessionmaker(
    autoflush=False,
    autcommit=False,
    bind=engine
)
