from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'chave-secreta'
    JWT_SECRET_KEY = 'jwt-chave'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
