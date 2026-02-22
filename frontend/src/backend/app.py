import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from dotenv import load_dotenv

# ==========================================
# CONFIG
# ==========================================

load_dotenv()

app = Flask(__name__)
CORS(app)

# ✅ SQLITE CONFIG
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///chamados.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "SUPER_SECRET_KEY_CHANGE_NOW"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)

db = SQLAlchemy(app)
jwt = JWTManager(app)

# ==========================================
# MODELOS
# ==========================================

class Usuario(db.Model):
    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="user")
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

    chamados = db.relationship("Chamado", backref="usuario", lazy=True)


class Chamado(db.Model):
    __tablename__ = "chamados"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default="Aberto")
    prioridade = db.Column(db.String(20), default="Média")
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=False)


# 🔥 cria o banco automaticamente
with app.app_context():
    db.create_all()

# ==========================================
# HELPERS
# ==========================================

def error(msg, code=400):
    return jsonify({"error": msg}), code


# ==========================================
# AUTH
# ==========================================

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("senha"):
        return error("Dados inválidos")

    if Usuario.query.filter_by(email=data["email"]).first():
        return error("Usuário já existe", 409)

    senha_hash = generate_password_hash(data["senha"])

    user = Usuario(
        email=data["email"],
        senha=senha_hash
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuário criado com sucesso"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = Usuario.query.filter_by(email=data.get("email")).first()

    if not user or not check_password_hash(user.senha, data.get("senha")):
        return error("Credenciais inválidas", 401)

    token = create_access_token(identity={
        "id": user.id,
        "email": user.email,
        "role": user.role
    })

    return jsonify({
        "token": token,
        "user": {
            "email": user.email,
            "role": user.role
        }
    })


# ==========================================
# CHAMADOS
# ==========================================

@app.route("/chamados", methods=["POST"])
@jwt_required()
def criar_chamado():
    identidade = get_jwt_identity()
    data = request.get_json()

    if not data.get("titulo") or not data.get("descricao"):
        return error("Título e descrição obrigatórios")

    chamado = Chamado(
        titulo=data["titulo"],
        descricao=data["descricao"],
        prioridade=data.get("prioridade", "Média"),
        usuario_id=identidade["id"]
    )

    db.session.add(chamado)
    db.session.commit()

    return jsonify({"msg": "Chamado criado"}), 201


@app.route("/chamados", methods=["GET"])
@jwt_required()
def listar_chamados():
    identidade = get_jwt_identity()

    chamados = Chamado.query.filter_by(usuario_id=identidade["id"]).all()

    return jsonify([
        {
            "id": c.id,
            "titulo": c.titulo,
            "descricao": c.descricao,
            "status": c.status,
            "prioridade": c.prioridade,
            "data": c.data_criacao.strftime("%d/%m/%Y")
        }
        for c in chamados
    ])


@app.route("/chamados/<int:id>", methods=["PUT"])
@jwt_required()
def atualizar_chamado(id):
    chamado = Chamado.query.get_or_404(id)
    data = request.get_json()

    chamado.status = data.get("status", chamado.status)
    chamado.prioridade = data.get("prioridade", chamado.prioridade)

    db.session.commit()

    return jsonify({"msg": "Atualizado com sucesso"})


@app.route("/chamados/<int:id>", methods=["DELETE"])
@jwt_required()
def deletar_chamado(id):
    chamado = Chamado.query.get_or_404(id)
    db.session.delete(chamado)
    db.session.commit()

    return jsonify({"msg": "Removido"})


# ==========================================
# 📊 DASHBOARD
# ==========================================

@app.route("/dashboard/metrics", methods=["GET"])
@jwt_required()
def dashboard_metrics():
    identidade = get_jwt_identity()
    user_id = identidade["id"]

    total = Chamado.query.filter_by(usuario_id=user_id).count()
    abertos = Chamado.query.filter_by(usuario_id=user_id, status="Aberto").count()
    fechados = Chamado.query.filter_by(usuario_id=user_id, status="Fechado").count()
    andamento = Chamado.query.filter_by(usuario_id=user_id, status="Em andamento").count()

    alta = Chamado.query.filter_by(usuario_id=user_id, prioridade="Alta").count()
    media = Chamado.query.filter_by(usuario_id=user_id, prioridade="Média").count()
    baixa = Chamado.query.filter_by(usuario_id=user_id, prioridade="Baixa").count()

    return jsonify({
        "status": {
            "total": total,
            "abertos": abertos,
            "fechados": fechados,
            "andamento": andamento
        },
        "prioridade": {
            "alta": alta,
            "media": media,
            "baixa": baixa
        }
    })


# ==========================================
# START
# ==========================================

if __name__ == "__main__":
    app.run(debug=True)