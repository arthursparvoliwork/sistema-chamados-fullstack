from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Chamado

chamados = Blueprint('chamados', __name__)

@chamados.route('/chamados', methods=['POST'])
@jwt_required()
def criar_chamado():
    dados = request.json
    novo = Chamado(
        titulo=dados['titulo'],
        descricao=dados['descricao']
    )
    db.session.add(novo)
    db.session.commit()
    return jsonify({"msg": "Chamado criado"}), 201

@chamados.route('/chamados', methods=['GET'])
@jwt_required()
def listar():
    lista_chamados = Chamado.query.all()
    return jsonify([
        {
            "id": c.id,
            "titulo": c.titulo,
            "status": c.status
        } for c in lista_chamados
    ])