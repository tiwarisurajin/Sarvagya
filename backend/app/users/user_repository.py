from app.database.dependencies import get_db
from backend.app.users.models import User
from sqlalchemy.orm import Session
from uuid import UUID
from sqlalchemy import select



class UserRepository:

    @staticmethod
    def create_user(
        db:Session,
        user: User     # here 'User' is being used as type hint
    )-> User | None:
 
        return User(
            id= UUID,
            name= user.name,
            username= user.username,
            email= user.email,
            password= user.hashed_password
        )
        

    @staticmethod
    def get_user_by_email(
        email : str,
        db: Session
    ):
        
        user_data= select(User).where(
            User.email == email)

        return db.scalar(user_data)



    @staticmethod
    def get_user(
        db: Session,
        id : UUID,
        username: str,
        email : str,
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


