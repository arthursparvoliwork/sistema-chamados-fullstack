from flask import Blueprint, request, jsonify
try:
    from flask_jwt_extended import create_access_token
except Exception:
    # Fallback: provide a clear runtime error if the package is not installed.
    # This prevents static import errors while guiding the developer to install the package.
    def create_access_token(identity):
        raise RuntimeError(
            "flask_jwt_extended is not installed; install it with 'pip install flask-jwt-extended'"
        )
from models import db, Usuario

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    dados = request.json
    usuario = Usuario(
        email=dados['email'],
        senha=dados['senha']  # depois você pode criptografar
    )
    db.session.add(usuario)
    db.session.commit()
    return jsonify({"msg": "Usuário criado"}), 201

@auth.route('/login', methods=['POST'])
def login():
    dados = request.json
    usuario = Usuario.query.filter_by(email=dados['email']).first()

    if not usuario or usuario.senha != dados['senha']:
        return jsonify({"erro": "Login inválido"}), 401

    token = create_access_token(identity=usuario.id)
    return jsonify(access_token=token)