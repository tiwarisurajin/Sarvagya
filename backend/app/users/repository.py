from app.database.dependencies import get_db
from app.users.models import User
from sqlalchemy.orm import Session
from uuid import UUID
from sqlalchemy import select



class UserRepository:
# --------------------Mainely Used in Registration --------------------

    @staticmethod
    def create_user(
        db:Session,
        user: User     # here 'User' is being used as type hint
    )-> User | None:
 
        new_user = User(
            name= user.name ,
            username= user.username,
            email= user.email,
            hashed_password= user.password
        )
        
        db.add(new_user)

        return new_user

# ============================================================
#  Get User and User Data from Database
# ============================================================



    @staticmethod
    def get_user(
        db: Session,
        id : UUID | None=None,
        username: str| None=None,
        email : str | None=None,
    ):
        if id is None and username is None and email is None:
            raise ValueError("Atleast one field must be provided")
        
        
        query= select(User)
        
        if id is not None:
            query = query.where(User.id == id)
        
        if username is not None:
            query= query.where(User.username == username)

        if email is not None :
            query= query.where(User.email == email)
            

        return db.scalar(query)


