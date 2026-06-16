from app.db.session import Base
from sqlalchemy import Integer,String,ForeignKey,Column,Boolean,DateTime,func
import uuid
from sqlalchemy.orm  import UUID
from sqlalchemy.orm import Mapped,mapped_column
from datetime import datetime


class User(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    name: Mapped[str]= mapped_column(
        nullable=False
    )
    username: Mapped[str]= mapped_column(
        unique=True,
        index=True,
        nullable=False
    )
    email: Mapped[str]= mapped_column(
        unique=True,
        index=True,
        nullable=False
    )
    password: Mapped[str]= mapped_column(
        nullable=False
    )
    is_active: Mapped[bool]= mapped_column(
        default=True,
        nullable=False
    )
    is_verified: Mapped[bool]: mapped_column(
        default=False,
        nullable=False
    )
    is_superuser: Mapped= mapped_column(
        default=False,
        nullable=False
    )
    created_at: Mapped[datetime]= mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at: Mapped[datetime]= mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    
        
        
             



