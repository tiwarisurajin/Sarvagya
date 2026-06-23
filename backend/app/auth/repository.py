from app.database.dependencies import get_db
from app.users.models import User
from app.auth.models import RefreshToken
from sqlalchemy.orm import Session
from uuid import UUID
from sqlalchemy import select


# =============================================================================================
#==============================================================================================
#             Code Starts From Here
#==============================================================================================
#==============================================================================================

class AuthRepository():

# =============================================================================================
#==============================================================================================
#   Save Refresh Token in DataBase
#==============================================================================================
#============================================================================================== 

    @staticmethod
    def save_refresh_tokens_in_db(
        db:Session,
        user_id : UUID,
        refresh_token : RefreshToken
)-> RefreshToken :
        
        created_token= RefreshToken(
            user_id =user_id,
            token=refresh_token
        )
        
        db.add(created_token)
        return created_token
    

    @staticmethod
    def get_refresh_token(
        db:Session,
        token:str
):
        

        token_query = select(RefreshToken).where(RefreshToken.token == token)
        
        

        return  db.scalar(token_query)


   
    
        
