from sqlalchemy.orm import  (
    Mapped,
    mapped_column
)
from sqlalchemy import (
    String,
    Boolean,
    Integer,
    ForeignKey,
    DateTime,
    func,
)
from datetime import datetime
from app.database.base import Base
from uuid import UUID as PyUUID,uuid4
from sqlalchemy.dialects.postgresql import UUID




class User(Base):
    __tablename__ = 'users'

    id: Mapped[PyUUID] = mapped_column(
        UUID(as_uuid=True),
        default =uuid4,
        primary_key=True,
        nullable=False
    )
    name: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )
    username: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        nullable=False
    )
    email: Mapped[str]= mapped_column(
        String(100),
        unique=True,
        nullable=False
    )
    hashed_password: Mapped[str] = mapped_column(
        String(128),
        nullable=False
    )
    
    is_verified: Mapped[bool] = mapped_column(
        default = False,
        nullable=False
    )
    is_active: Mapped[bool] = mapped_column(
        default= True,
        nullable=False
    )
    is_superuser: Mapped[bool]= mapped_column(
        default=False,
        nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
    

