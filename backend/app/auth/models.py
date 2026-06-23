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
from app.users.models import User
import uuid
from uuid import UUID
from sqlalchemy.dialects.postgresql import UUID


class RefreshToken(Base):
    __tablename__ = 'refresh_token_records'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id",ondelete='CASCADE'),
        nullable=False
    )
    token: Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        default= True,
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
    
