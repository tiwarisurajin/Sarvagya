from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict
    )


class Settings(BaseSettings):
    APP_NAME : str

    ALGORITHM : str
    
    ACCESS_SECRET_KEY : str
    ACCESS_TOKEN_EXPIRE_MINUTES : int

    REFRESH_SECRET_KEY : str
    REFRESH_TOKEN_EXPIRE_DAYS : int

    
    DATABASE_NAME : str
    DATABASE_HOSTNAME : str
    DATABASE_USERNAME : str
    DATABASE_PORT : int
    DATABASE_PASSWORD : str

    @property
    def DATABASE_URL(self) -> str :
        return (
            f"postgresql+psycopg://"
            f"{self.DATABASE_USERNAME}:"
            f"{self.DATABASE_PASSWORD}@"
            f"{self.DATABASE_HOSTNAME}:"
            f"{self.DATABASE_PORT}/"
            f"{self.DATABASE_NAME}"
            )

        
    model_config = SettingsConfigDict(
    env_file=".env",
    extra="ignore"
    )
    
    
settings = Settings(
    
)